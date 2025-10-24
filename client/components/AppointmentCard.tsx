import { cn } from "@/lib/utils";

interface AppointmentCardProps {
  patientName: string;
  appointmentType: string;
  time: string;
  status: "Confirmed" | "Pending";
  avatarUrl: string;
  variant?: "default" | "yellow";
}

export function AppointmentCard({
  patientName,
  appointmentType,
  time,
  status,
  avatarUrl,
  variant = "default",
}: AppointmentCardProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 p-4 rounded-lg",
        variant === "default" ? "bg-gray-50" : "bg-yellow-50"
      )}
    >
      <img
        src={avatarUrl}
        alt={patientName}
        className="w-12 h-12 rounded-full"
      />

      <div className="flex-1">
        <p className="text-base text-gray-800 font-medium">{patientName}</p>
        <p className="text-sm text-gray-500">{appointmentType}</p>
      </div>

      <div className="text-right">
        <p className="text-sm font-medium text-gray-800 mb-0.5">{time}</p>
        <span
          className={cn(
            "inline-flex items-center justify-center px-3 py-1 rounded-full text-xs",
            status === "Confirmed"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          )}
        >
          {status}
        </span>
      </div>
    </div>
  );
}
