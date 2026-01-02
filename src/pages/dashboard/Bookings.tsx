import { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, Users, Eye, CheckCircle2, AlertTriangle, Play, Printer, DollarSign, Car } from 'lucide-react';

const mockBookings = [
  { id: '1', customer: 'Juan dela Cruz', email: 'juan@email.com', vehicle: 'Toyota Vios', plate: 'ABC 1234', service: 'Tire Vulcanizing', shop: 'Main Branch', date: '2024-01-15', time: '10:00 AM', employees: ['Mike', 'John'], status: 'in-progress', amount: 500 },
  { id: '2', customer: 'Maria Santos', email: 'maria@email.com', vehicle: 'Honda CR-V', plate: 'XYZ 5678', service: 'Wheel Alignment', shop: 'Main Branch', date: '2024-01-15', time: '11:30 AM', employees: ['John'], status: 'not-started', amount: 1500 },
  { id: '3', customer: 'Pedro Reyes', email: 'pedro@email.com', vehicle: 'Ford Ranger', plate: 'DEF 9012', service: 'Tire Replacement', shop: 'Branch 2', date: '2024-01-15', time: '02:00 PM', employees: ['Mike', 'Carlos'], status: 'done', amount: 8000 },
  { id: '4', customer: 'Ana Garcia', email: 'ana@email.com', vehicle: 'Mitsubishi Montero', plate: 'GHI 3456', service: 'Wheel Balancing', shop: 'Main Branch', date: '2024-01-15', time: '03:30 PM', employees: ['Carlos'], status: 'stuck', amount: 1200 },
];

const statusConfig: any = {
  'not-started': { label: 'Not Started', color: 'bg-slate-500/10 text-slate-400 border-slate-500/20', icon: Clock },
  'in-progress': { label: 'In Progress', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20', icon: Play },
  'stuck': { label: 'Stuck', color: 'bg-red-500/10 text-red-400 border-red-500/20', icon: AlertTriangle },
  'done': { label: 'Done', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', icon: CheckCircle2 },
};

export default function Bookings() {
  const [bookings, setBookings] = useState(mockBookings);
  const [filter, setFilter] = useState<string>('all');
  
  // View & Billing State
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [billingAmount, setBillingAmount] = useState<string>('');

  // Print Logic
  const componentRef = useRef<HTMLDivElement>(null); 
  
  const handlePrint = useReactToPrint({
    contentRef: componentRef, 
    documentTitle: `Receipt-${selectedBooking?.id}`,
  });

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(b => b.status === filter);

  const counts = {
    all: bookings.length,
    'not-started': bookings.filter(b => b.status === 'not-started').length,
    'in-progress': bookings.filter(b => b.status === 'in-progress').length,
    'stuck': bookings.filter(b => b.status === 'stuck').length,
    'done': bookings.filter(b => b.status === 'done').length,
  };

  const handleStatusChange = (id: string, newStatus: string) => {
      setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  const handleViewClick = (booking: any) => {
      setSelectedBooking(booking);
      setBillingAmount(booking.amount.toString());
      setIsViewOpen(true);
  }

  const handleSaveAmount = () => {
      if(selectedBooking) {
          const newAmount = parseFloat(billingAmount);
          
          if (isNaN(newAmount)) {
              alert("Please enter a valid number");
              return;
          }

          // Update main list
          const updatedBookings = bookings.map(b => 
              b.id === selectedBooking.id ? { ...b, amount: newAmount } : b
          );
          setBookings(updatedBookings);
          
          // Update current view
          setSelectedBooking({ ...selectedBooking, amount: newAmount });
          
          // Show Feedback
          alert(`Success! Amount updated to ₱${newAmount.toLocaleString()}`);
      }
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-950 p-6 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Booking & Scheduling</h1>
            <p className="text-slate-400 mt-1">Manage service bookings and assignments</p>
          </div>
        </div>

        {/* DETAILS & BILLING DIALOG */}
        <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
            <DialogContent className="bg-slate-900 border-slate-800 text-white sm:max-w-[600px] p-0 gap-0">
                {selectedBooking && (
                    <div className="flex flex-col h-full">
                        <DialogHeader className="p-6 border-b border-slate-800 bg-slate-800/30 flex flex-row justify-between items-start space-y-0">
                            <div>
                                <DialogTitle className="text-xl font-bold text-white">Booking Details</DialogTitle>
                                {/* UPDATED ID FORMAT IN MODAL */}
                                <p className="text-slate-400 text-sm mt-1">ID: #B{selectedBooking.id.padStart(3, '0')}</p>
                            </div>
                            <div className="flex gap-2">
                                {/* PRINT BUTTON */}
                                <Button 
                                    onClick={handlePrint} 
                                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-md border border-blue-500"
                                >
                                    <Printer className="w-4 h-4 mr-2" /> Print Receipt
                                </Button>
                            </div>
                        </DialogHeader>

                        {/* ======================================================== */}
                        {/* THERMAL RECEIPT LAYOUT                                   */}
                        {/* ======================================================== */}
                        <div style={{ display: "none" }}>
                            <div 
                                ref={componentRef} 
                                className="bg-white text-black font-mono text-[12px] p-2"
                                style={{ width: '300px' }} // Standard thermal width
                            >
                                {/* HEADER WITH LOGO */}
                                <div className="text-center mb-2">
                                    <img 
                                        src="/autocare_logo.png" 
                                        alt="AutoCare Logo" 
                                        className="mx-auto mb-2 w-20 h-auto grayscale" 
                                    />
                                    <div className="font-bold text-sm leading-tight mb-1">
                                        AUTOCARE VULCANIZING &<br/>AUTO SERVICES
                                    </div>
                                    <div className="text-[10px]">📍 M123 Manila City</div>
                                    <div className="text-[10px]">📞 09XX-XXX-XXXX</div>
                                    <div className="text-[10px]">📧 autocare@gmail.com</div>
                                </div>

                                <div className="border-b border-dashed border-black my-2" />
                                <div className="text-center font-bold">OFFICIAL RECEIPT</div>
                                <div className="border-b border-dashed border-black my-2" />

                                {/* RECEIPT DETAILS */}
                                <div className="flex justify-between">
                                    <span>Rcpt No.:</span>
                                    <span>AC-B{selectedBooking.id.padStart(3, '0')}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Date:</span>
                                    <span>{selectedBooking.date}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Time:</span>
                                    <span>{selectedBooking.time}</span>
                                </div>

                                <div className="border-b border-dashed border-black my-2" />

                                {/* CUSTOMER DETAILS */}
                                <div className="font-bold mb-1">CUSTOMER DETAILS</div>
                                <div className="flex">
                                    <span className="w-12">Name:</span>
                                    <span className="flex-1 text-right">{selectedBooking.customer}</span>
                                </div>
                                <div className="flex">
                                    <span className="w-12">Vhcl:</span>
                                    <span className="flex-1 text-right">{selectedBooking.vehicle}</span>
                                </div>
                                <div className="flex">
                                    <span className="w-12">Plate:</span>
                                    <span className="flex-1 text-right">{selectedBooking.plate}</span>
                                </div>

                                <div className="border-b border-dashed border-black my-2" />

                                {/* ITEMS / SERVICES */}
                                <div className="font-bold mb-1">SERVICE DETAILS</div>
                                <div className="flex justify-between font-bold border-b border-black pb-1 mb-1">
                                    <span>Desc</span>
                                    <span>Price</span>
                                </div>
                                
                                <div className="flex justify-between mb-1 items-start">
                                    <span className="w-[70%]">{selectedBooking.service}</span>
                                    <span>{parseFloat(billingAmount || selectedBooking.amount).toFixed(2)}</span>
                                </div>

                                <div className="border-b border-dashed border-black my-2" />

                                {/* PAYMENT SUMMARY */}
                                <div className="flex justify-between font-bold">
                                    <span>Subtotal:</span>
                                    <span>{parseFloat(billingAmount || selectedBooking.amount).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Discount:</span>
                                    <span>0.00</span>
                                </div>
                                <div className="flex justify-between font-bold text-sm mt-1">
                                    <span>TOTAL:</span>
                                    <span>₱{parseFloat(billingAmount || selectedBooking.amount).toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                                </div>

                                <div className="mt-2 text-[10px]">
                                    <div>Payment Method: Cash / GCash</div>
                                </div>

                                <div className="border-b border-dashed border-black my-2" />

                                {/* STAFF & REMARKS */}
                                <div>
                                    <span className="font-bold">Staff:</span> {selectedBooking.employees[0]}
                                </div>
                                <div className="mt-1">
                                    <div className="font-bold">Remarks:</div>
                                    <div>[ / ] Service Completed</div>
                                    <div>[ / ] Cust Advised for Check-up</div>
                                </div>

                                <div className="border-b border-dashed border-black my-2" />

                                {/* FOOTER */}
                                <div className="text-center mt-3 mb-4 font-bold">
                                    Thank you for choosing AutoCare!<br/>
                                    Your safety is our priority.
                                </div>
                            </div>
                        </div>
                        {/* ======================================================== */}
                        {/* END THERMAL LAYOUT                       */}
                        {/* ======================================================== */}

                        {/* SCREEN VIEW */}
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <Label className="text-xs text-slate-500 uppercase font-bold">Customer</Label>
                                    <p className="text-white font-medium text-lg">{selectedBooking.customer}</p>
                                </div>
                                <div>
                                    <Label className="text-xs text-slate-500 uppercase font-bold">Vehicle</Label>
                                    <p className="text-white font-medium text-lg">{selectedBooking.vehicle}</p>
                                    <p className="text-slate-400 text-sm">{selectedBooking.plate}</p>
                                </div>
                            </div>

                            <div className="h-px bg-slate-800" />

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <Label className="text-xs text-slate-500 uppercase font-bold">Service</Label>
                                    <p className="text-primary font-bold text-lg">{selectedBooking.service}</p>
                                </div>
                                <div>
                                    <Label className="text-xs text-slate-500 uppercase font-bold">Technicians</Label>
                                    <p className="text-slate-300">{selectedBooking.employees.join(', ')}</p>
                                </div>
                            </div>

                            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                                <Label className="text-xs text-slate-500 uppercase font-bold mb-3 block flex items-center gap-2">
                                    <DollarSign className="w-4 h-4" /> Billing Information
                                </Label>
                                <div className="flex items-center gap-4">
                                    <div className="flex-1">
                                        <Label className="text-slate-400 mb-1 block">Total Service Amount (PHP)</Label>
                                        <Input 
                                            type="number" 
                                            value={billingAmount}
                                            onChange={(e) => setBillingAmount(e.target.value)}
                                            className="bg-slate-900 border-slate-700 text-white text-xl font-bold h-12 focus:border-primary"
                                        />
                                    </div>
                                    <Button onClick={handleSaveAmount} className="bg-emerald-600 hover:bg-emerald-700 text-white h-12 mt-6 px-6 font-bold shadow-md">
                                        Update Amount
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-slate-900 border-t border-slate-800 flex justify-end">
                            <Button 
                                variant="outline" 
                                onClick={() => setIsViewOpen(false)} 
                                className="border-slate-600 text-white hover:bg-slate-800 hover:text-white"
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>

        {

        }
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Object.entries(statusConfig).map(([key, config]: any) => {
            const StatusIcon = config.icon;
            return (
              <Card key={key} className="bg-slate-900 border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${config.color} border shadow-lg`}>
                    <StatusIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{counts[key as keyof typeof counts]}</p>
                    <p className="text-sm text-slate-400">{config.label}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Tabs defaultValue="all" onValueChange={setFilter} className="space-y-6">
          <TabsList className="bg-slate-900 border border-slate-800 text-slate-400 p-1">
            <TabsTrigger value="all" className="data-[state=active]:bg-slate-800 data-[state=active]:text-white">All ({counts.all})</TabsTrigger>
            <TabsTrigger value="not-started" className="data-[state=active]:bg-slate-800 data-[state=active]:text-slate-200">Not Started ({counts['not-started']})</TabsTrigger>
            <TabsTrigger value="in-progress" className="data-[state=active]:bg-slate-800 data-[state=active]:text-blue-400">In Progress ({counts['in-progress']})</TabsTrigger>
            <TabsTrigger value="stuck" className="data-[state=active]:bg-slate-800 data-[state=active]:text-red-400">Stuck ({counts.stuck})</TabsTrigger>
            <TabsTrigger value="done" className="data-[state=active]:bg-slate-800 data-[state=active]:text-emerald-400">Done ({counts.done})</TabsTrigger>
          </TabsList>

          <TabsContent value={filter}>
            <Card className="bg-slate-900 border-slate-800 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white">Bookings List</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-slate-800 overflow-hidden">
                  <Table>
                    <TableHeader className="bg-slate-800/50">
                      <TableRow className="border-slate-800 hover:bg-slate-800/50">
                        {

                        }
                        <TableHead className="text-slate-300 font-semibold w-[120px]">Booking ID</TableHead>
                        
                        <TableHead className="text-slate-300 font-semibold">Customer</TableHead>
                        <TableHead className="text-slate-300 font-semibold">Service</TableHead>
                        <TableHead className="text-slate-300 font-semibold">Shop</TableHead>
                        <TableHead className="text-slate-300 font-semibold">Schedule</TableHead>
                        <TableHead className="text-slate-300 font-semibold">Assigned To</TableHead>
                        <TableHead className="text-slate-300 font-semibold w-[180px]">Status</TableHead>
                        <TableHead className="text-right text-slate-300 font-semibold">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBookings.map((booking) => {
                        return (
                          <TableRow key={booking.id} className="border-slate-800 hover:bg-slate-800/30 transition-colors">
                            {

                            }
                            <TableCell>
                                <span className="inline-flex items-center justify-center px-3 py-1 rounded-md bg-slate-950 border border-slate-800 text-xs font-mono text-white font-bold">
                                    #B{booking.id.padStart(3, '0')}
                                </span>
                            </TableCell>

                            {
                              
                            }
                            <TableCell>
                              <div>
                                <p className="font-medium text-white">{booking.customer}</p>
                                <p className="text-xs text-slate-500">{booking.email}</p>
                              </div>
                            </TableCell>

                            <TableCell className="text-slate-300">
                                <div className="flex items-center gap-2">
                                    <Car className="w-3 h-3 text-slate-500" />
                                    {booking.service}
                                </div>
                            </TableCell>
                            <TableCell className="text-slate-400">{booking.shop}</TableCell>
                            <TableCell>
                              <div className="flex flex-col text-slate-300">
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-3 h-3 text-slate-500" />
                                  {booking.date}
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                  <Clock className="w-3 h-3 text-slate-500" />
                                  <span className="text-xs">{booking.time}</span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1.5 text-slate-300">
                                <Users className="w-4 h-4 text-slate-500" />
                                {booking.employees.join(', ')}
                              </div>
                            </TableCell>
                            
                            <TableCell>
                                <Select
                                    defaultValue={booking.status}
                                    onValueChange={(val) => handleStatusChange(booking.id, val)}
                                >
                                  <SelectTrigger className={`w-full h-8 text-xs border-slate-700 ${statusConfig[booking.status].color.split(' ')[0]} ${statusConfig[booking.status].color.split(' ')[1]}`}>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent className="bg-slate-900 border-slate-700 text-slate-300">
                                    <SelectItem value="not-started">Not Started</SelectItem>
                                    <SelectItem value="in-progress">In Progress</SelectItem>
                                    <SelectItem value="stuck">Stuck</SelectItem>
                                    <SelectItem value="done">Done</SelectItem>
                                  </SelectContent>
                                </Select>
                            </TableCell>

                            <TableCell>
                              <div className="flex justify-end gap-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800"
                                    onClick={() => handleViewClick(booking)}
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}