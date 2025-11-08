import { Users, Calendar, FilePlus, DollarSign, Plus, CalendarPlus, Pill } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { StatCard } from "@/components/StatCard";
import { AppointmentCard } from "@/components/AppointmentCard";
import { Button } from "@/components/ui/button";

export default function Index() {
  const navigate = useNavigate();
  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <StatCard
          title="Total Patients"
          value="1,247"
          subtitle="12% from last month"
          icon={Users}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
          subtitleColor="text-green-600"
          trend="up"
        />

        <StatCard
          title="Today's Appointments"
          value="24"
          subtitle="6 pending"
          icon={Calendar}
          iconBgColor="bg-cyan-50"
          iconColor="text-cyan-600"
          subtitleColor="text-cyan-600"
          trend="neutral"
        />

        <StatCard
          title="New Records"
          value="89"
          subtitle="This week"
          icon={FilePlus}
          iconBgColor="bg-orange-50"
          iconColor="text-orange-600"
          subtitleColor="text-orange-600"
        />

        <StatCard
          title="Revenue"
          value="$47.2K"
          subtitle="8% increase"
          icon={DollarSign}
          iconBgColor="bg-green-50"
          iconColor="text-green-600"
          subtitleColor="text-green-600"
          trend="up"
        />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-100 shadow-lg">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">Today's Appointments</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
            </div>

            <div className="p-6 space-y-4">
              <AppointmentCard
                patientName="Sarah Johnson"
                appointmentType="Regular Checkup"
                time="9:00 AM"
                status="Confirmed"
                avatarUrl="https://api.builder.io/api/v1/image/assets/TEMP/4797045a415e4685f6ece1f02c4fddc8a442d5d0?width=96"
              />

              <AppointmentCard
                patientName="Michael Chen"
                appointmentType="Follow-up Consultation"
                time="10:30 AM"
                status="Pending"
                avatarUrl="https://api.builder.io/api/v1/image/assets/TEMP/3f5171ffb70573f3f90d88d0f6a0f956a41610e7?width=96"
                variant="yellow"
              />

              <AppointmentCard
                patientName="Emily Rodriguez"
                appointmentType="Lab Results Review"
                time="2:00 PM"
                status="Confirmed"
                avatarUrl="https://api.builder.io/api/v1/image/assets/TEMP/d93d236cdc77a5f1f61b8438a7c582628122434f?width=96"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 md:space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-lg p-4 md:p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            
            <div className="space-y-3">
              <Button 
                onClick={() => navigate('/patients')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-base"
              >
                <Plus className="w-4 h-4" />
                New Patient
              </Button>

              <Button 
                onClick={() => navigate('/appointments')}
                variant="outline" 
                className="w-full h-[50px] text-base text-gray-700 border-gray-200"
              >
                <CalendarPlus className="w-4 h-4" />
                Schedule Appointment
              </Button>

              <Button 
                onClick={() => navigate('/medical-records')}
                variant="outline" 
                className="w-full h-[50px] text-base text-gray-700 border-gray-200"
              >
                <Pill className="w-4 h-4" />
                New Prescription
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-sm text-gray-800">Lab results uploaded for Sarah Johnson</p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-sm text-gray-800">New appointment scheduled</p>
                  <p className="text-xs text-gray-500">15 minutes ago</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-sm text-gray-800">Prescription sent to pharmacy</p>
                  <p className="text-xs text-gray-500">1 hour ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
