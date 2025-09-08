import { Fragment, useState } from 'react';
import { Calendar, Download, Filter } from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { cn } from '@/lib/utils';

interface DateRange {
  start: string;
  end: string;
}

interface MetricCard {
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
}

// Dummy data for demonstration
const appointmentData = [
  { month: 'Jan', completed: 65, canceled: 12 },
  { month: 'Feb', completed: 59, canceled: 15 },
  { month: 'Mar', completed: 80, canceled: 8 },
  { month: 'Apr', completed: 81, canceled: 10 },
  { month: 'May', completed: 56, canceled: 14 },
  { month: 'Jun', completed: 55, canceled: 11 },
];

const consultationData = [
  { month: 'Jan', patients: 142, target: 150 },
  { month: 'Feb', patients: 158, target: 150 },
  { month: 'Mar', patients: 175, target: 150 },
  { month: 'Apr', patients: 168, target: 150 },
  { month: 'May', patients: 152, target: 150 },
  { month: 'Jun', patients: 189, target: 150 },
];

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState<DateRange>({
    start: '2024-01-01',
    end: '2024-12-31',
  });

  const metrics: MetricCard[] = [
    {
      title: 'Total Revenue',
      value: '$124,568',
      change: 12.5,
      trend: 'up',
    },
    {
      title: 'Total Patients',
      value: '1,245',
      change: 8.3,
      trend: 'up',
    },
    {
      title: 'Avg. Wait Time',
      value: '18 mins',
      change: -5.2,
      trend: 'down',
    },
    {
      title: 'Patient Satisfaction',
      value: '4.8/5',
      change: 2.1,
      trend: 'up',
    },
  ];

  const handleExportPDF = () => {
    // Implement PDF export functionality
    console.log('Exporting PDF...');
  };

  return (
    <Fragment>
      <div className="p-4 md:p-8 max-w-[1600px] mx-auto">
        {/* Date Range and Export Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="border border-gray-200 rounded-lg px-3 py-2"
              />
              <span className="text-gray-500">to</span>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
          <button
            onClick={handleExportPDF}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Download className="w-4 h-4" />
            Export PDF
          </button>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-100 shadow-lg p-6">
              <h3 className="text-sm text-gray-500 mb-2">{metric.title}</h3>
              <p className="text-3xl font-bold text-gray-800 mb-2">{metric.value}</p>
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "text-sm font-medium",
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  )}
                >
                  {metric.change > 0 ? '+' : ''}{metric.change}%
                </span>
                <span className="text-sm text-gray-500">vs last month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Appointments Chart */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Appointment Volume</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={appointmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" fill="#0088FE" name="Completed" />
                <Bar dataKey="canceled" fill="#FF8042" name="Canceled" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Patient Consultations Chart */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Patient Consultations</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={consultationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="patients" 
                  stroke="#00C49F" 
                  strokeWidth={3}
                  name="Patients Consulted"
                  dot={{ fill: '#00C49F', r: 6 }}
                  activeDot={{ r: 8 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#FF8042" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Monthly Target"
                  dot={{ fill: '#FF8042', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Fragment>
  );
}