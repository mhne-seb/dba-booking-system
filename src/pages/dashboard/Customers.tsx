import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea'; 
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
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Search, Plus, Eye, Edit, Trash2, Car, Phone, Mail, User, Save, X, AlertTriangle, Calendar, Clock } from 'lucide-react';

// Vehicle Types
const vehicleTypes = ['Sedan', 'SUV', 'Pickup Truck', 'Van', 'Motorcycle', 'Other'];

// Service Types 
const serviceTypes = [
    'Tire Vulcanizing',
    'Tire Replacement',
    'Wheel Alignment',
    'Wheel Balancing',
    'Flat Tire Repair',
    'Tire Rotation',
    'Other',
];

// Initial Mock Data
const initialCustomers = [
  { id: '1', fullName: 'Juan dela Cruz', contactNumber: '09123456789', email: 'juan@email.com', vehicleType: 'Sedan', vehicleBrand: 'Toyota', vehicleModel: 'Vios', plateNumber: 'ABC 1234' },
  { id: '2', fullName: 'Maria Santos', contactNumber: '09234567890', email: 'maria@email.com', vehicleType: 'SUV', vehicleBrand: 'Honda', vehicleModel: 'CR-V', plateNumber: 'XYZ 5678' },
];

const emptyCustomer = {
    fullName: '',
    contactNumber: '',
    email: '',
    vehicleType: '',
    vehicleBrand: '',
    vehicleModel: '',
    plateNumber: '',
    // New Service Fields
    preferredDate: '',
    preferredTime: '',
    serviceType: '',
    concern: ''
};

export default function Customers() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  
  // STATES
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState<any>(null);
  
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState(emptyCustomer);

  const [deleteCustomer, setDeleteCustomer] = useState<any>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // LOGIC: FILTER
  const filteredCustomers = customers.filter(customer =>
    customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.id.includes(searchTerm)
  );

  // LOGIC: ADD CUSTOMER
  const handleAddSubmit = () => {
    if (!newCustomer.fullName || !newCustomer.contactNumber || !newCustomer.plateNumber) {
        alert("Please fill in required fields");
        return;
    }

    const currentMaxId = customers.length > 0 ? Math.max(...customers.map(c => parseInt(c.id))) : 0;
    const newId = (currentMaxId + 1).toString();
    
    const customerToAdd = {
        id: newId,
        ...newCustomer
    };

    setCustomers([...customers, customerToAdd]);
    setIsAddOpen(false);
    setNewCustomer(emptyCustomer);
  };

  // LOGIC: EDIT CUSTOMER
  const handleEditSave = () => {
    if (editFormData) {
      const updatedCustomers = customers.map(c => 
        c.id === editFormData.id ? editFormData : c
      );
      setCustomers(updatedCustomers);
      setSelectedCustomer(editFormData);
      setIsEditing(false);
    }
  };

  // LOGIC: DELETE CUSTOMER
  const handleDeleteClick = (customer: any) => {
      setDeleteCustomer(customer);
      setIsDeleteOpen(true);
  }

  const confirmDelete = () => {
      if (deleteCustomer) {
          const updatedList = customers.filter(c => c.id !== deleteCustomer.id);
          setCustomers(updatedList);
          setIsDeleteOpen(false);
          setDeleteCustomer(null);
      }
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-950 p-6 space-y-8">
        
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Customer Information</h1>
            <p className="text-slate-400 mt-1">Manage customer records and vehicle information</p>
          </div>
          
          {

          }
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Customer
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-slate-800 text-white sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add New Customer</DialogTitle>
                    <DialogDescription className="text-slate-400">
                        Enter the customer's personal details, vehicle info, and service request.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                    
                    {/* 1. Personal Information */}
                    <div>
                        <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-3 flex items-center gap-2">
                            <User className="w-4 h-4" /> Personal Information
                        </h4>
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <Label className="text-slate-300">Full Name *</Label>
                                <Input 
                                    placeholder="Enter full name" 
                                    className="bg-slate-950 border-slate-700 text-white focus:border-primary" 
                                    value={newCustomer.fullName} 
                                    onChange={(e) => setNewCustomer({...newCustomer, fullName: e.target.value})} 
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-slate-300">Contact Number *</Label>
                                    <Input 
                                        placeholder="e.g. 09123456789" 
                                        className="bg-slate-950 border-slate-700 text-white focus:border-primary" 
                                        value={newCustomer.contactNumber} 
                                        onChange={(e) => setNewCustomer({...newCustomer, contactNumber: e.target.value})} 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-300">Email (Optional)</Label>
                                    <Input 
                                        placeholder="your@email.com" 
                                        className="bg-slate-950 border-slate-700 text-white focus:border-primary" 
                                        value={newCustomer.email} 
                                        onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})} 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="h-px bg-slate-800" />

                    {/* 2. Vehicle Information */}
                    <div>
                        <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-3 flex items-center gap-2">
                            <Car className="w-4 h-4" /> Vehicle Information
                        </h4>
                        <div className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-slate-300">Vehicle Type *</Label>
                                    <Select 
                                        value={newCustomer.vehicleType} 
                                        onValueChange={(value) => setNewCustomer({...newCustomer, vehicleType: value})}
                                    >
                                        <SelectTrigger className="bg-slate-950 border-slate-700 text-white focus:border-primary">
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-900 border-slate-800 text-white">
                                            {vehicleTypes.map((type) => (
                                                <SelectItem key={type} value={type} className="focus:bg-slate-800 focus:text-white cursor-pointer">
                                                    {type}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-300">Brand *</Label>
                                    <Input 
                                        placeholder="e.g. Toyota" 
                                        className="bg-slate-950 border-slate-700 text-white focus:border-primary" 
                                        value={newCustomer.vehicleBrand} 
                                        onChange={(e) => setNewCustomer({...newCustomer, vehicleBrand: e.target.value})} 
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-slate-300">Model *</Label>
                                    <Input 
                                        placeholder="e.g. Vios" 
                                        className="bg-slate-950 border-slate-700 text-white focus:border-primary" 
                                        value={newCustomer.vehicleModel} 
                                        onChange={(e) => setNewCustomer({...newCustomer, vehicleModel: e.target.value})} 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-300">Plate Number *</Label>
                                    <Input 
                                        placeholder="ABC 1234" 
                                        className="bg-slate-950 border-slate-700 text-white font-mono uppercase focus:border-primary" 
                                        value={newCustomer.plateNumber} 
                                        onChange={(e) => setNewCustomer({...newCustomer, plateNumber: e.target.value})} 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-slate-800" />

                    {/* 3. Service Details */}
                    <div>
                        <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-3 flex items-center gap-2">
                            <Calendar className="w-4 h-4" /> Service Details
                        </h4>
                        <div className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-slate-300">Preferred Date *</Label>
                                    <Input 
                                        type="date"
                                        className="bg-slate-950 border-slate-700 text-white focus:border-primary [color-scheme:dark]" 
                                        value={newCustomer.preferredDate} 
                                        onChange={(e) => setNewCustomer({...newCustomer, preferredDate: e.target.value})} 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-300">Preferred Time *</Label>
                                    <Input 
                                        type="time"
                                        className="bg-slate-950 border-slate-700 text-white focus:border-primary [color-scheme:dark]" 
                                        value={newCustomer.preferredTime} 
                                        onChange={(e) => setNewCustomer({...newCustomer, preferredTime: e.target.value})} 
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <Label className="text-slate-300">Service Type *</Label>
                                <Select 
                                    value={newCustomer.serviceType} 
                                    onValueChange={(value) => setNewCustomer({...newCustomer, serviceType: value})}
                                >
                                    <SelectTrigger className="bg-slate-950 border-slate-700 text-white focus:border-primary">
                                        <SelectValue placeholder="Select service" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-900 border-slate-800 text-white">
                                        {serviceTypes.map((type) => (
                                            <SelectItem key={type} value={type} className="focus:bg-slate-800 focus:text-white cursor-pointer">
                                                {type}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-slate-300">Describe Your Concern</Label>
                                <textarea
                                    className="flex w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white ring-offset-background placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px]"
                                    placeholder="Please describe the issue or service needed..."
                                    value={newCustomer.concern}
                                    onChange={(e) => setNewCustomer({...newCustomer, concern: e.target.value})}
                                />
                            </div>
                        </div>
                    </div>

                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddOpen(false)} className="border-slate-700 text-slate-300 hover:bg-slate-800">Cancel</Button>
                    <Button onClick={handleAddSubmit} className="bg-primary text-white hover:bg-primary/90">Save Customer</Button>
                </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* DELETE CONFIRMATION */}
        <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
            <DialogContent className="bg-slate-900 border-slate-800 text-white sm:max-w-[425px]">
                <DialogHeader>
                    <div className="flex items-center gap-2 text-red-500 mb-2">
                        <AlertTriangle className="w-6 h-6" />
                        <DialogTitle className="text-lg font-bold">Confirm Deletion</DialogTitle>
                    </div>
                    <DialogDescription className="text-slate-400">
                        Are you sure you want to delete <span className="font-bold text-white">{deleteCustomer?.fullName}</span>? 
                        This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={() => setIsDeleteOpen(false)} className="border-slate-700 text-slate-300 hover:bg-slate-800">
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
                        Yes, Delete Record
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        {/* CUSTOMER TABLE */}
        <Card className="bg-slate-900 border-slate-800 shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">All Customers</CardTitle>
              <div className="relative w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                  placeholder="Search ID, name, plate..."
                  className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-primary focus:ring-primary/20"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-slate-800 overflow-hidden">
              <Table>
                <TableHeader className="bg-slate-800/50">
                  <TableRow className="border-slate-800 hover:bg-slate-800/50">
                    <TableHead className="text-slate-300 font-semibold w-[120px]">Customer ID</TableHead>
                    <TableHead className="text-slate-300 font-semibold">Name</TableHead>
                    <TableHead className="text-slate-300 font-semibold">Contact</TableHead>
                    <TableHead className="text-slate-300 font-semibold">Vehicle</TableHead>
                    <TableHead className="text-slate-300 font-semibold">Plate Number</TableHead>
                    <TableHead className="text-right text-slate-300 font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow key={customer.id} className="border-slate-800 hover:bg-slate-800/30 transition-colors">
                      <TableCell>
                        <span className="font-mono text-xs font-bold text-slate-400 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                          #{customer.id.padStart(4, '0')}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700">
                            <span className="text-xs font-bold text-primary">
                              {customer.fullName.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-white text-sm">{customer.fullName}</p>
                            <p className="text-xs text-slate-500">{customer.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-400 text-sm">{customer.contactNumber}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-slate-300 text-sm">
                          <Car className="w-3.5 h-3.5 text-primary/70" />
                          {customer.vehicleBrand} <span className="text-slate-500">{customer.vehicleModel}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-xs font-mono text-white">
                          {customer.plateNumber}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-1">
                          
                          {/* VIEW / EDIT DIALOG */}
                          <Dialog onOpenChange={(open) => {
                              if(!open) setIsEditing(false);
                          }}>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-blue-500/10 hover:text-blue-400 text-slate-400" onClick={() => {
                                  setSelectedCustomer(customer);
                                  setEditFormData(customer);
                              }}>
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-slate-900 border-slate-800 text-white sm:max-w-[500px] p-0 overflow-hidden gap-0">
                              {selectedCustomer && (
                                <>
                                  <div className="bg-slate-800/50 p-6 border-b border-slate-800 flex items-center gap-4">
                                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/20 text-white text-2xl font-bold">
                                      {isEditing ? editFormData?.fullName.charAt(0) : selectedCustomer.fullName.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                      {isEditing ? (
                                        <div className="space-y-2">
                                            <Input 
                                                value={editFormData?.fullName} 
                                                onChange={(e) => setEditFormData({...editFormData, fullName: e.target.value})}
                                                className="bg-slate-950 border-slate-700 text-white h-8 font-bold text-lg"
                                                placeholder="Full Name"
                                            />
                                            <Input 
                                                value={editFormData?.email} 
                                                onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
                                                className="bg-slate-950 border-slate-700 text-slate-300 h-7 text-xs"
                                                placeholder="Email Address"
                                            />
                                        </div>
                                      ) : (
                                        <>
                                            <DialogTitle className="text-xl font-bold text-white">{selectedCustomer.fullName}</DialogTitle>
                                            <p className="text-slate-400 flex items-center gap-2 mt-1 text-sm">
                                                <Mail className="w-3 h-3" /> {selectedCustomer.email}
                                            </p>
                                        </>
                                      )}
                                    </div>
                                  </div>

                                  <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                                    <div>
                                      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <User className="w-4 h-4" /> Personal Details
                                      </h4>
                                      <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                          <Label className="text-slate-400 text-xs">Contact Number</Label>
                                          {isEditing ? (
                                            <Input 
                                                value={editFormData?.contactNumber} 
                                                onChange={(e) => setEditFormData({...editFormData, contactNumber: e.target.value})}
                                                className="bg-slate-950 border-slate-700 text-white h-9"
                                            />
                                          ) : (
                                            <div className="flex items-center gap-2 text-white font-medium h-9">
                                                <Phone className="w-4 h-4 text-primary" />
                                                {selectedCustomer.contactNumber}
                                            </div>
                                          )}
                                        </div>
                                        <div className="space-y-1.5">
                                          <Label className="text-slate-400 text-xs">Customer ID</Label>
                                          <div className="text-white font-medium font-mono bg-slate-950 px-2 py-1.5 rounded w-fit border border-slate-800 text-sm">
                                            #{selectedCustomer.id.padStart(4, '0')}
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="h-px bg-slate-800" />

                                    <div>
                                      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <Car className="w-4 h-4" /> Vehicle Information
                                      </h4>
                                      <div className={`p-4 rounded-lg border ${isEditing ? 'bg-slate-900 border-slate-800' : 'bg-slate-950 border-slate-800'}`}>
                                        <div className="flex justify-between items-start mb-4 gap-4">
                                          <div className="flex-1 space-y-3">
                                            {isEditing ? (
                                                <>
                                                    <div className="space-y-1">
                                                        <Label className="text-[10px] text-slate-500">Brand</Label>
                                                        <Input 
                                                            value={editFormData?.vehicleBrand} 
                                                            onChange={(e) => setEditFormData({...editFormData, vehicleBrand: e.target.value})}
                                                            className="bg-slate-950 border-slate-700 text-white h-8"
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <Label className="text-[10px] text-slate-500">Model</Label>
                                                        <Input 
                                                            value={editFormData?.vehicleModel} 
                                                            onChange={(e) => setEditFormData({...editFormData, vehicleModel: e.target.value})}
                                                            className="bg-slate-950 border-slate-700 text-white h-8"
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <Label className="text-[10px] text-slate-500">Type</Label>
                                                        <Select 
                                                            value={editFormData?.vehicleType} 
                                                            onValueChange={(value) => setEditFormData({...editFormData, vehicleType: value})}
                                                        >
                                                            <SelectTrigger className="bg-slate-950 border-slate-700 text-white h-8">
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent className="bg-slate-900 border-slate-800 text-white">
                                                                {vehicleTypes.map((type) => (
                                                                    <SelectItem key={type} value={type}>{type}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div>
                                                        <p className="text-slate-400 text-xs mb-1">Vehicle Model</p>
                                                        <p className="text-lg font-bold text-white">{selectedCustomer.vehicleBrand} {selectedCustomer.vehicleModel}</p>
                                                        <p className="text-sm text-primary">{selectedCustomer.vehicleType}</p>
                                                    </div>
                                                </>
                                            )}
                                          </div>

                                          <div className="space-y-2 text-center min-w-[100px]">
                                            {isEditing ? (
                                                <div className="space-y-1 text-left">
                                                    <Label className="text-[10px] text-slate-500">Plate Number</Label>
                                                    <Input 
                                                        value={editFormData?.plateNumber} 
                                                        onChange={(e) => setEditFormData({...editFormData, plateNumber: e.target.value})}
                                                        className="bg-slate-950 border-slate-700 text-white font-mono h-9 uppercase"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="bg-slate-900 px-3 py-2 rounded border border-slate-700">
                                                    <p className="text-[10px] text-slate-500 uppercase font-bold mb-0.5">Plate No.</p>
                                                    <p className="font-mono text-white font-semibold tracking-wide">{selectedCustomer.plateNumber}</p>
                                                </div>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="bg-slate-900 p-4 border-t border-slate-800 flex justify-end gap-2">
                                    {isEditing ? (
                                        <>
                                            <Button variant="outline" onClick={() => { setIsEditing(false); setEditFormData(selectedCustomer); }} className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                                                <X className="w-4 h-4 mr-2" /> Cancel
                                            </Button>
                                            <Button onClick={handleEditSave} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                                                <Save className="w-4 h-4 mr-2" /> Save Changes
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                                                    Close
                                                </Button>
                                            </DialogTrigger>
                                            <Button onClick={() => { setEditFormData(selectedCustomer); setIsEditing(true); }} className="bg-primary hover:bg-primary/90 text-white">
                                                <Edit className="w-4 h-4 mr-2" /> Edit Details
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
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 hover:bg-red-500/10 hover:text-red-400 text-slate-400"
                            onClick={() => handleDeleteClick(customer)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
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