import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, XCircle, Clock, AlertCircle, Eye, AlertTriangle, User, Calendar, Car, FileText, MoreHorizontal } from 'lucide-react';

// Mock Employees
const mockEmployees = [
    { id: 'emp1', name: 'Mike Johnson (Senior Tech)' },
    { id: 'emp2', name: 'John Smith (Mechanic)' },
    { id: 'emp3', name: 'Carlos Garcia (Tire Specialist)' },
];

// Initial Data
const mockRequests = [
  { id: '1', customerId: '1', customer: 'Juan dela Cruz', vehicle: 'Toyota Vios (ABC 1234)', service: 'Tire Vulcanizing', date: '2024-01-15', time: '10:00 AM', status: 'pending' as const, concern: 'Front left tire has a slow leak. Need to check if vulcanizing is enough or need replacement.', assignedTo: null },
  { id: '2', customerId: '2', customer: 'Maria Santos', vehicle: 'Honda CR-V (XYZ 5678)', service: 'Wheel Alignment', date: '2024-01-15', time: '11:30 AM', status: 'confirmed' as const, concern: 'Car pulling to the right when driving straight.', assignedTo: 'John Smith' },
  { id: '3', customerId: '3', customer: 'Pedro Reyes', vehicle: 'Ford Ranger (DEF 9012)', service: 'Tire Replacement', date: '2024-01-15', time: '02:00 PM', status: 'in-queue' as const, concern: 'Need new set of tires for off-road use.', assignedTo: 'Carlos Garcia' },
  { id: '4', customerId: '4', customer: 'Ana Garcia', vehicle: 'Mitsubishi Montero (GHI 3456)', service: 'Wheel Balancing', date: '2024-01-16', time: '09:00 AM', status: 'pending' as const, concern: 'Vibration at high speeds (80kph+).', assignedTo: null },
  { id: '5', customerId: '5', customer: 'Jose Rizal', vehicle: 'Hyundai Accent (JKL 7890)', service: 'Flat Tire Repair', date: '2024-01-14', time: '03:00 PM', status: 'cancelled' as const, concern: 'Flat tire on rear right.', assignedTo: null },
];

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-orange-500/10 text-orange-400 border-orange-500/20', icon: Clock },
  confirmed: { label: 'Confirmed', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', icon: CheckCircle2 },
  'in-queue': { label: 'In Queue', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20', icon: AlertCircle },
  cancelled: { label: 'Cancelled', color: 'bg-red-500/10 text-red-400 border-red-500/20', icon: XCircle },
};

export default function ServiceRequests() {
  const [requests, setRequests] = useState(mockRequests);
  const [filter, setFilter] = useState<string>('all');

  // ACTION STATES
  const [confirmDialog, setConfirmDialog] = useState<{isOpen: boolean, id: string | null}>({ isOpen: false, id: null });
  const [cancelDialog, setCancelDialog] = useState<{isOpen: boolean, id: string | null}>({ isOpen: false, id: null });
  const [viewDialog, setViewDialog] = useState<{isOpen: boolean, request: any | null}>({ isOpen: false, request: null });

  const [selectedEmployee, setSelectedEmployee] = useState<string>('');

  // Filter Logic
  const filteredRequests = filter === 'all' 
    ? requests 
    : requests.filter(r => r.status === filter);

  const counts = {
    all: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    confirmed: requests.filter(r => r.status === 'confirmed').length,
    'in-queue': requests.filter(r => r.status === 'in-queue').length,
    cancelled: requests.filter(r => r.status === 'cancelled').length,
  };

  // --- LOGIC: CONFIRM & ASSIGN ---
  const handleConfirm = () => {
    const targetId = confirmDialog.id || viewDialog.request?.id;
    if (targetId && selectedEmployee) {
        const updatedRequests = requests.map(req => 
            req.id === targetId 
                ? { ...req, status: 'confirmed' as const, assignedTo: selectedEmployee } 
                : req
        );
        setRequests(updatedRequests);
        setConfirmDialog({ isOpen: false, id: null });
        setViewDialog({ isOpen: false, request: null });
        setSelectedEmployee('');
    }
  };

  // --- LOGIC: CANCEL REQUEST ---
  const handleCancel = () => {
    const targetId = cancelDialog.id || viewDialog.request?.id;
    if (targetId) {
        const updatedRequests = requests.map(req => 
            req.id === targetId ? { ...req, status: 'cancelled' as const } : req
        );
        setRequests(updatedRequests);
        setCancelDialog({ isOpen: false, id: null });
        setViewDialog({ isOpen: false, request: null });
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-950 p-6 space-y-8">
        
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Service Requests</h1>
          <p className="text-slate-400 mt-1">Manage and process customer service requests</p>
        </div>

        {

        }
        <Dialog open={viewDialog.isOpen} onOpenChange={(open) => setViewDialog({ ...viewDialog, isOpen: open })}>
            <DialogContent className="bg-slate-900 border-slate-800 text-white sm:max-w-[600px] p-0 overflow-hidden gap-0">
                {viewDialog.request && (
                    <>
                        <div className="p-6 border-b border-slate-800 bg-slate-800/30 flex justify-between items-start">
                            <div>
                                <DialogTitle className="text-xl font-bold text-white">Request Details</DialogTitle>
                                <p className="text-slate-400 text-sm mt-1">ID: #{viewDialog.request.id.padStart(4, '0')}</p>
                            </div>
                            <Badge className={`${statusConfig[viewDialog.request.status as keyof typeof statusConfig].color} border px-3 py-1 capitalize`}>
                                {viewDialog.request.status}
                            </Badge>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <Label className="text-xs uppercase text-slate-500 font-bold tracking-wider">Customer</Label>
                                    <div className="flex items-center gap-2 text-white font-medium">
                                        <User className="w-4 h-4 text-primary" />
                                        {viewDialog.request.customer}
                                    </div>
                                    <p className="text-xs text-slate-500 pl-6">Cust ID: #{viewDialog.request.customerId.padStart(4, '0')}</p>
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-xs uppercase text-slate-500 font-bold tracking-wider">Vehicle</Label>
                                    <div className="flex items-center gap-2 text-white font-medium">
                                        <Car className="w-4 h-4 text-primary" />
                                        {viewDialog.request.vehicle}
                                    </div>
                                </div>
                            </div>

                            <div className="h-px bg-slate-800" />

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <Label className="text-xs uppercase text-slate-500 font-bold tracking-wider">Service Requested</Label>
                                    <p className="text-white font-bold text-lg">{viewDialog.request.service}</p>
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-xs uppercase text-slate-500 font-bold tracking-wider">Preferred Schedule</Label>
                                    <div className="flex items-center gap-2 text-white">
                                        <Calendar className="w-4 h-4 text-slate-400" />
                                        {viewDialog.request.date}
                                    </div>
                                    <div className="flex items-center gap-2 text-white mt-1">
                                        <Clock className="w-4 h-4 text-slate-400" />
                                        {viewDialog.request.time}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                                <Label className="text-xs uppercase text-slate-500 font-bold tracking-wider mb-2 block">Assigned Technician</Label>
                                {viewDialog.request.assignedTo ? (
                                    <div className="flex items-center gap-2 text-emerald-400 font-medium">
                                        <CheckCircle2 className="w-4 h-4" />
                                        {viewDialog.request.assignedTo}
                                    </div>
                                ) : (
                                    <p className="text-slate-500 text-sm italic">Not yet assigned (Pending confirmation)</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs uppercase text-slate-500 font-bold tracking-wider">Customer Concern / Notes</Label>
                                <div className="bg-slate-950 p-3 rounded-md border border-slate-800 text-sm text-slate-300 min-h-[60px]">
                                    <div className="flex gap-2">
                                        <FileText className="w-4 h-4 text-slate-500 mt-0.5" />
                                        {viewDialog.request.concern}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t border-slate-800 bg-slate-800/30 flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setViewDialog({ ...viewDialog, isOpen: false })} className="border-slate-700 text-slate-300 hover:bg-slate-800">
                                Close
                            </Button>
                            
                            {viewDialog.request.status === 'pending' && (
                                <>
                                    <Button 
                                        variant="destructive" 
                                        className="bg-red-600 hover:bg-red-700"
                                        onClick={() => setCancelDialog({ isOpen: true, id: viewDialog.request.id })}
                                    >
                                        Reject
                                    </Button>
                                    <Button 
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white"
                                        onClick={() => setConfirmDialog({ isOpen: true, id: viewDialog.request.id })}
                                    >
                                        Confirm & Assign
                                    </Button>
                                </>
                            )}
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>

        {

        }
        <Dialog open={confirmDialog.isOpen} onOpenChange={(open) => {
            setConfirmDialog({ ...confirmDialog, isOpen: open });
            if(!open) setSelectedEmployee('');
        }}>
            <DialogContent className="bg-slate-900 border-slate-800 text-white sm:max-w-[425px]">
                <DialogHeader>
                    <div className="flex items-center gap-2 text-emerald-500 mb-2">
                        <CheckCircle2 className="w-6 h-6" />
                        <DialogTitle className="text-lg font-bold">Approve Request</DialogTitle>
                    </div>
                    <DialogDescription className="text-slate-400">
                        Assign an employee to confirm this booking.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <div className="space-y-2">
                        <Label className="text-slate-300">Assign Technician *</Label>
                        <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                            <SelectTrigger className="bg-slate-950 border-slate-700 text-white">
                                <SelectValue placeholder="Select an employee..." />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-900 border-slate-800 text-white">
                                {mockEmployees.map(emp => (
                                    <SelectItem key={emp.id} value={emp.name} className="focus:bg-slate-800 cursor-pointer">{emp.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setConfirmDialog({ isOpen: false, id: null })} className="border-slate-700 text-slate-300 hover:bg-slate-800">Cancel</Button>
                    <Button onClick={handleConfirm} disabled={!selectedEmployee} className="bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50">Confirm</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        {

        }
        <Dialog open={cancelDialog.isOpen} onOpenChange={(open) => setCancelDialog({ ...cancelDialog, isOpen: open })}>
            <DialogContent className="bg-slate-900 border-slate-800 text-white sm:max-w-[425px]">
                <DialogHeader>
                    <div className="flex items-center gap-2 text-red-500 mb-2">
                        <AlertTriangle className="w-6 h-6" />
                        <DialogTitle className="text-lg font-bold">Reject Request</DialogTitle>
                    </div>
                    <DialogDescription className="text-slate-400">
                        Are you sure you want to cancel this request? This cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={() => setCancelDialog({ isOpen: false, id: null })} className="border-slate-700 text-slate-300 hover:bg-slate-800">No, Go Back</Button>
                    <Button variant="destructive" onClick={handleCancel} className="bg-red-600 hover:bg-red-700 text-white">Yes, Cancel</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        <Tabs defaultValue="all" onValueChange={setFilter} className="space-y-6">
          <TabsList className="bg-slate-900 border border-slate-800 text-slate-400 p-1">
            <TabsTrigger value="all" className="data-[state=active]:bg-slate-800 data-[state=active]:text-white">All ({counts.all})</TabsTrigger>
            <TabsTrigger value="pending" className="data-[state=active]:bg-slate-800 data-[state=active]:text-orange-400">Pending ({counts.pending})</TabsTrigger>
            <TabsTrigger value="confirmed" className="data-[state=active]:bg-slate-800 data-[state=active]:text-emerald-400">Confirmed ({counts.confirmed})</TabsTrigger>
            <TabsTrigger value="in-queue" className="data-[state=active]:bg-slate-800 data-[state=active]:text-blue-400">In Queue ({counts['in-queue']})</TabsTrigger>
            <TabsTrigger value="cancelled" className="data-[state=active]:bg-slate-800 data-[state=active]:text-red-400">Cancelled ({counts.cancelled})</TabsTrigger>
          </TabsList>

          <TabsContent value={filter} className="mt-6">
            <Card className="bg-slate-900 border-slate-800 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white">Request List</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-slate-800 overflow-hidden">
                  <Table>
                    <TableHeader className="bg-slate-800/50">
                      <TableRow className="border-slate-800 hover:bg-slate-800/50">
                        <TableHead className="text-slate-300 font-semibold w-[100px]">Cust. ID</TableHead>
                        <TableHead className="text-slate-300 font-semibold">Customer</TableHead>
                        <TableHead className="text-slate-300 font-semibold">Vehicle</TableHead>
                        <TableHead className="text-slate-300 font-semibold">Service</TableHead>
                        <TableHead className="text-slate-300 font-semibold">Preferred Date</TableHead>
                        <TableHead className="text-slate-300 font-semibold">Assigned To</TableHead>
                        <TableHead className="text-slate-300 font-semibold">Status</TableHead>
                        <TableHead className="text-right text-slate-300 font-semibold">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRequests.map((request) => {
                        const status = statusConfig[request.status];
                        const StatusIcon = status.icon;
                        
                        return (
                          <TableRow key={request.id} className="border-slate-800 hover:bg-slate-800/30 transition-colors">
                            <TableCell>
                                <span className="font-mono text-xs font-bold text-slate-400 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                                    #{request.customerId.padStart(4, '0')}
                                </span>
                            </TableCell>
                            
                            <TableCell className="font-medium text-white">
                              {request.customer}
                              <div className="text-xs text-slate-500 mt-0.5 truncate max-w-[200px]" title={request.concern}>
                                Note: {request.concern}
                              </div>
                            </TableCell>
                            <TableCell className="text-slate-400">{request.vehicle}</TableCell>
                            <TableCell>
                              <span className="text-slate-300 bg-slate-800 px-2 py-1 rounded text-sm">
                                {request.service}
                              </span>
                            </TableCell>
                            <TableCell className="text-slate-400">
                              <div className="flex flex-col">
                                <span>{request.date}</span>
                                <span className="text-xs text-slate-500">{request.time}</span>
                              </div>
                            </TableCell>

                            <TableCell>
                                {request.assignedTo ? (
                                    <div className="flex items-center gap-2 text-slate-300">
                                        <User className="w-3 h-3 text-primary" />
                                        <span className="text-sm">{request.assignedTo}</span>
                                    </div>
                                ) : (
                                    <span className="text-xs text-slate-600 italic">Unassigned</span>
                                )}
                            </TableCell>

                            <TableCell>
                              <Badge variant="outline" className={`${status.color} border font-medium`}>
                                <StatusIcon className="w-3 h-3 mr-1.5" />
                                {status.label}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex justify-end gap-2">
                                {
                                
                                }
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="bg-slate-900 border-slate-800 text-white">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        
                                        <DropdownMenuItem 
                                            onClick={() => setViewDialog({ isOpen: true, request: request })}
                                            className="focus:bg-slate-800 cursor-pointer"
                                        >
                                            <Eye className="w-4 h-4 mr-2" /> View Details
                                        </DropdownMenuItem>

                                        {request.status === 'pending' && (
                                            <>
                                                <DropdownMenuSeparator className="bg-slate-800" />
                                                <DropdownMenuItem 
                                                    onClick={() => setConfirmDialog({ isOpen: true, id: request.id })}
                                                    className="focus:bg-emerald-900/50 text-emerald-400 focus:text-emerald-400 cursor-pointer"
                                                >
                                                    <CheckCircle2 className="w-4 h-4 mr-2" /> Confirm
                                                </DropdownMenuItem>
                                                <DropdownMenuItem 
                                                    onClick={() => setCancelDialog({ isOpen: true, id: request.id })}
                                                    className="focus:bg-red-900/50 text-red-400 focus:text-red-400 cursor-pointer"
                                                >
                                                    <XCircle className="w-4 h-4 mr-2" /> Cancel
                                                </DropdownMenuItem>
                                            </>
                                        )}
                                    </DropdownMenuContent>
                                </DropdownMenu>
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