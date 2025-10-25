import { Fragment, useState, useEffect } from 'react';
import { Calendar, Search, Plus } from 'lucide-react';
import { cn } from "@/lib/utils";

interface Appointment {
  id: number;
  patientName: string;
  date: string;
  time: string;
  visitType: 'Home' | 'Clinic';
  status: 'Scheduled' | 'Completed' | 'Cancelled';
}

const initialAppointments: Appointment[] = [
  {
    id: 1,
    patientName: "Sarah Johnson",
    date: "2025-10-26",
    time: "09:00 AM",
    visitType: "Clinic",
    status: "Scheduled"
  },
  {
    id: 2,
    patientName: "Michael Chen",
    date: "2025-10-26",
    time: "10:30 AM",
    visitType: "Home",
    status: "Scheduled"
  },
  {
    id: 3,
    patientName: "Emily Rodriguez",
    date: "2025-01-16",
    time: "02:00 PM",
    visitType: "Clinic",
    status: "Completed"
  },
  {
    id: 4,
    patientName: "James Wilson",
    date: "2025-01-16",
    time: "02:00 PM",
    visitType: "Clinic",
    status: "Completed"
  }
];

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAppointments = appointments.filter(appointment =>
    appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    appointment.date.includes(searchQuery) ||
    appointment.time.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Fragment>
      <div className="p-4 md:p-8 max-w-[1600px] mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-100 shadow-lg p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-2">Total Appointments</p>
                <p className="text-3xl font-bold text-gray-800">{appointments.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-lg p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-2">Today's Appointments</p>
                <p className="text-3xl font-bold text-gray-800">
                  {appointments.filter(a => a.date === new Date().toISOString().split('T')[0]).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-lg p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-2">Completed</p>
                <p className="text-3xl font-bold text-gray-800">
                  {appointments.filter(a => a.status === 'Completed').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-lg">
          {/* Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-gray-800">Appointments</h2>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search appointments..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-64 h-10 pl-10 pr-4 border border-gray-200 rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button className="h-10 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium">
                  <Plus className="w-4 h-4" />
                  New Appointment
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Time</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Patient Name</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Visit Type</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-600">{appointment.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{appointment.time}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                      {appointment.patientName}
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium",
                        appointment.visitType === "Clinic" 
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      )}>
                        {appointment.visitType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium",
                        {
                          "bg-yellow-100 text-yellow-800": appointment.status === "Scheduled",
                          "bg-green-100 text-green-800": appointment.status === "Completed",
                          "bg-red-100 text-red-800": appointment.status === "Cancelled"
                        }
                      )}>
                        {appointment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  );
}