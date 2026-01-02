import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { 
  CalendarDays, 
  Clock, 
  CheckCircle2, 
  Users,
  TrendingUp,
  Car,
  Activity
} from 'lucide-react';

const stats = [
  { 
    title: 'Total Bookings Today', 
    value: '12', 
    icon: CalendarDays, 
    change: '+3 from yesterday',
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10'
  },
  { 
    title: 'Pending Requests', 
    value: '5', 
    icon: Clock, 
    change: '2 need attention',
    color: 'text-orange-400',
    bgColor: 'bg-orange-400/10'
  },
  { 
    title: 'Completed Today', 
    value: '7', 
    icon: CheckCircle2, 
    change: '+2 from yesterday',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-400/10'
  },
  { 
    title: 'Total Customers', 
    value: '248', 
    icon: Users, 
    change: '+15 this month',
    color: 'text-violet-400',
    bgColor: 'bg-violet-400/10'
  },
];

const recentBookings = [
  { id: 1, customer: 'Juan dela Cruz', vehicle: 'Toyota Vios', service: 'Tire Vulcanizing', status: 'In Progress', time: '10:30 AM' },
  { id: 2, customer: 'Maria Santos', vehicle: 'Honda Civic', service: 'Wheel Alignment', status: 'Not Started', time: '11:00 AM' },
  { id: 3, customer: 'Pedro Reyes', vehicle: 'Ford Ranger', service: 'Tire Replacement', status: 'Done', time: '09:00 AM' },
  { id: 4, customer: 'Ana Garcia', vehicle: 'Mitsubishi Montero', service: 'Wheel Balancing', status: 'In Progress', time: '10:00 AM' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Done': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    case 'In Progress': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    case 'Not Started': return 'bg-slate-700/50 text-slate-400 border-slate-600/50';
    default: return 'bg-muted text-muted-foreground';
  }
};

export default function Dashboard() {
  return (
    <DashboardLayout>
      {

      }
      <div className="min-h-screen bg-slate-950 p-6 space-y-8">
        
        {

        }
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard</h1>
          <p className="text-slate-400 mt-1">Welcome back! Here's an overview of today's activities.</p>
        </div>

        {

        }
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-slate-900 border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-slate-400">{stat.title}</p>
                    <h3 className="text-3xl font-bold text-white mt-2 group-hover:scale-105 transition-transform duration-300 origin-left">
                      {stat.value}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2">{stat.change}</p>
                  </div>
                  {
                    
                  }
                  <div className={`p-3 rounded-xl ${stat.bgColor} ${stat.color} transition-all duration-300 group-hover:scale-110 shadow-lg`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {

          }
          <Card className="lg:col-span-2 bg-slate-900 border-slate-800 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Car className="w-5 h-5 text-primary" />
                Today's Bookings
              </CardTitle>
              <CardDescription className="text-slate-400">
                Recent service appointments for today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div 
                    key={booking.id} 
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-4 mb-3 sm:mb-0">
                      <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Car className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{booking.customer}</p>
                        <p className="text-sm text-slate-400">{booking.vehicle} • {booking.service}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-4 min-w-[140px]">
                      <span className="text-sm text-slate-500 font-mono">{booking.time}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Popular Services & Stats  */}
          <div className="space-y-6">
             {/* Weekly Overview */}
            <Card className="bg-slate-900 border-slate-800 shadow-lg">
                <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Weekly Overview
                </CardTitle>
                </CardHeader>
                <CardContent>
                 <div className="space-y-4">
                    {/* Chart Bars */}
                    {[
                        { day: 'Mon', val: '80%' },
                        { day: 'Tue', val: '60%' },
                        { day: 'Wed', val: '100%' },
                        { day: 'Thu', val: '50%' },
                        { day: 'Fri', val: '75%' }
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <span className="text-xs text-slate-500 w-8">{item.day}</span>
                            <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-primary" style={{ width: item.val }}></div>
                            </div>
                        </div>
                    ))}
                 </div>
                </CardContent>
            </Card>

            {/* Popular Services */}
            <Card className="bg-slate-900 border-slate-800 shadow-lg">
                <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                    <Activity className="w-5 h-5 text-primary" />
                    Popular Services
                </CardTitle>
                </CardHeader>
                <CardContent>
                <div className="space-y-5">
                    {[
                    { name: 'Tire Vulcanizing', pct: 42, color: 'bg-blue-500' },
                    { name: 'Wheel Alignment', pct: 28, color: 'bg-emerald-500' },
                    { name: 'Tire Replacement', pct: 18, color: 'bg-orange-500' },
                    ].map((item, i) => (
                    <div key={i} className="space-y-2 group">
                        <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-300 font-medium">{item.name}</span>
                        <span className="text-white font-bold">{item.pct}%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div 
                            className={`h-full ${item.color}`} 
                            style={{ width: `${item.pct}%` }} 
                        />
                        </div>
                    </div>
                    ))}
                </div>
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}