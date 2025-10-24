import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  subtitleColor: string;
  trend?: "up" | "down" | "neutral";
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBgColor,
  iconColor,
  subtitleColor,
  trend,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-lg p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-500 mb-2">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mb-2">{value}</p>
          <div className="flex items-center gap-1">
            {trend === "up" && (
              <svg width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.02974 0.970337C4.73677 0.677368 4.26099 0.677368 3.96802 0.970337L0.218018 4.72034C-0.0749512 5.01331 -0.0749512 5.48909 0.218018 5.78206C0.510986 6.07502 0.986768 6.07502 1.27974 5.78206L3.75005 3.3094V10.5C3.75005 10.9149 4.0852 11.25 4.50005 11.25C4.91489 11.25 5.25005 10.9149 5.25005 10.5V3.3094L7.72036 5.77971C8.01333 6.07268 8.48911 6.07268 8.78208 5.77971C9.07505 5.48674 9.07505 5.01096 8.78208 4.71799L5.03208 0.967993L5.02974 0.970337Z" fill="currentColor"/>
              </svg>
            )}
            {trend === "neutral" && (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 0C7.5913 0 9.11742 0.632141 10.2426 1.75736C11.3679 2.88258 12 4.4087 12 6C12 7.5913 11.3679 9.11742 10.2426 10.2426C9.11742 11.3679 7.5913 12 6 12C4.4087 12 2.88258 11.3679 1.75736 10.2426C0.632141 9.11742 0 7.5913 0 6C0 4.4087 0.632141 2.88258 1.75736 1.75736C2.88258 0.632141 4.4087 0 6 0ZM5.4375 2.8125V6C5.4375 6.1875 5.53125 6.36328 5.68828 6.46875L7.93828 7.96875C8.19609 8.14219 8.54531 8.07187 8.71875 7.81172C8.89219 7.55156 8.82187 7.20469 8.56172 7.03125L6.5625 5.7V2.8125C6.5625 2.50078 6.31172 2.25 6 2.25C5.68828 2.25 5.4375 2.50078 5.4375 2.8125Z" fill="currentColor"/>
              </svg>
            )}
            <p className={cn("text-sm", subtitleColor)}>{subtitle}</p>
          </div>
        </div>

        <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", iconBgColor)}>
          <Icon className={cn("w-6 h-6", iconColor)} />
        </div>
      </div>
    </div>
  );
}
