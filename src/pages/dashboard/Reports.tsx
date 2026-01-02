import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { FileText, Download, Calendar, TrendingUp, Car, CheckCircle2, Check } from 'lucide-react';

// Sample completed booking data
const completedBookings = [
  { id: '1', customer: 'Juan dela Cruz', vehicle: 'Toyota Vios', service: 'Tire Vulcanizing', date: '2024-01-15', employee: 'Mike Johnson', duration: '1.5 hrs' },
  { id: '2', customer: 'Pedro Reyes', vehicle: 'Ford Ranger', service: 'Tire Replacement', date: '2024-01-15', employee: 'Carlos Garcia', duration: '2 hrs' },
  { id: '3', customer: 'Maria Santos', vehicle: 'Honda CR-V', service: 'Wheel Alignment', date: '2024-01-14', employee: 'John Smith', duration: '1 hr' },
  { id: '4', customer: 'Ana Garcia', vehicle: 'Mitsubishi Montero', service: 'Wheel Balancing', date: '2024-01-14', employee: 'Mike Johnson', duration: '45 mins' },
  { id: '5', customer: 'Jose Rizal', vehicle: 'Hyundai Accent', service: 'Flat Tire Repair', date: '2024-01-13', employee: 'John Smith', duration: '30 mins' },
];

const stats = [
  { title: 'Total Completed', value: '156', icon: CheckCircle2, period: 'This Month', color: 'bg-emerald-500/10 text-emerald-400' },
  { title: 'Vehicles Serviced', value: '142', icon: Car, period: 'This Month', color: 'bg-blue-500/10 text-blue-400' },
  { title: 'Avg. Service Time', value: '1.2 hrs', icon: TrendingUp, period: 'This Month', color: 'bg-violet-500/10 text-violet-400' },
];

export default function Reports() {
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-01-15");
  const [serviceFilter, setServiceFilter] = useState("");
  
  // Notification State
  const [showNotif, setShowNotif] = useState(false);

  const filteredData = completedBookings.filter(booking => {
    const bDate = new Date(booking.date);
    const start = new Date(startDate);
    const end = new Date(endDate);
    const matchesDate = bDate >= start && bDate <= end;
    const matchesService = booking.service.toLowerCase().includes(serviceFilter.toLowerCase());
    return matchesDate && matchesService;
  });

  const handleExport = () => {
    const headers = ["Date", "Customer", "Vehicle", "Service", "Technician", "Duration", "Status"];
    const csvRows = filteredData.map(b => [
      b.date,
      `"${b.customer}"`,
      `"${b.vehicle}"`,
      `"${b.service}"`,
      `"${b.employee}"`,
      b.duration,
      "Completed"
    ]);

    const csvContent = [headers, ...csvRows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `AutoCare_Report_${startDate}_to_${endDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // TRIGGER NOTIFICATION
    setShowNotif(true);
    setTimeout(() => setShowNotif(false), 3000);
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-950 p-6 space-y-8 relative">
        
        {
          
        }
        {showNotif && (
          <div className="fixed top-6 right-6 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-2xl flex items-center gap-3 border border-emerald-400/50">
              <div className="bg-white/20 p-1 rounded-full">
                <Check className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-bold text-sm">Export Successful!</p>
                <p className="text-xs text-emerald-100">Report has been downloaded to your device.</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">History & Reports</h1>
            <p className="text-slate-400 mt-1">View completed bookings and generate reports</p>
          </div>
          <Button 
            onClick={handleExport}
            className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-slate-900 border-slate-800 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-400">{stat.title}</p>
                    <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                    <p className="text-xs text-slate-500 mt-1">{stat.period}</p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.color} shadow-lg`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters Section */}
        <Card className="bg-slate-900 border-slate-800 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <FileText className="w-5 h-5 text-primary" />
              Generate Report
            </CardTitle>
            <CardDescription className="text-slate-400">Filter and export booking data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label className="text-slate-300">Start Date</Label>
                <Input 
                    type="date" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="bg-slate-800 border-slate-700 text-white [color-scheme:dark]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">End Date</Label>
                <Input 
                    type="date" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="bg-slate-800 border-slate-700 text-white [color-scheme:dark]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Service Type</Label>
                <Input 
                    placeholder="All services" 
                    value={serviceFilter}
                    onChange={(e) => setServiceFilter(e.target.value)}
                    className="bg-slate-800 border-slate-700 text-white"
                />
              </div>
              <div className="flex items-end">
                <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white border border-slate-700">
                  <Calendar className="w-4 h-4 mr-2" />
                  Apply Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* History Table */}
        <Card className="bg-slate-900 border-slate-800 shadow-xl">
          <CardHeader>
            <CardTitle className="text-white">Completed Bookings History</CardTitle>
            <CardDescription className="text-slate-400">Showing {filteredData.length} records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-slate-800 overflow-hidden">
                <Table>
                <TableHeader className="bg-slate-800/50">
                    <TableRow className="border-slate-800">
                    <TableHead className="text-slate-300">Date</TableHead>
                    <TableHead className="text-slate-300">Customer</TableHead>
                    <TableHead className="text-slate-300">Vehicle</TableHead>
                    <TableHead className="text-slate-300">Service</TableHead>
                    <TableHead className="text-slate-300">Technician</TableHead>
                    <TableHead className="text-slate-300">Duration</TableHead>
                    <TableHead className="text-slate-300">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredData.map((booking) => (
                    <TableRow key={booking.id} className="border-slate-800 hover:bg-slate-800/30">
                        <TableCell className="text-slate-400">{booking.date}</TableCell>
                        <TableCell className="font-medium text-white">{booking.customer}</TableCell>
                        <TableCell className="text-slate-400">{booking.vehicle}</TableCell>
                        <TableCell className="text-slate-300">{booking.service}</TableCell>
                        <TableCell className="text-slate-400">{booking.employee}</TableCell>
                        <TableCell className="text-slate-400">{booking.duration}</TableCell>
                        <TableCell>
                        <Badge variant="outline" className="border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Completed
                        </Badge>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}