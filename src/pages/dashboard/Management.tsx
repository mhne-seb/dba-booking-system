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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, Building2, Users, MapPin, Phone, Search, Save } from 'lucide-react';

// MOCK DATA
const initialEmployees = [
  { id: '1', name: 'Mike Johnson', position: 'Senior Technician', contactNumber: '09111222333', shop: 'Main Branch', isActive: true },
  { id: '2', name: 'John Smith', position: 'Technician', contactNumber: '09222333444', shop: 'Main Branch', isActive: true },
  { id: '3', name: 'Carlos Garcia', position: 'Technician', contactNumber: '09333444555', shop: 'Branch 2', isActive: true },
  { id: '4', name: 'Ana Martinez', position: 'Junior Technician', contactNumber: '09444555666', shop: 'Main Branch', isActive: false },
];

const initialShops = [
  { id: '1', name: 'Main Branch', address: '123 Main Street, City Center', contactNumber: '02-1234567', employeeCount: 3, isActive: true },
  { id: '2', name: 'Branch 2', address: '456 Side Street, Downtown', contactNumber: '02-7654321', employeeCount: 1, isActive: true },
];

export default function Management() {
  // --- STATES ---
  const [employees, setEmployees] = useState(initialEmployees);
  const [shops, setShops] = useState(initialShops);
  const [employeeSearch, setEmployeeSearch] = useState('');

  // MODAL CONFIG
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [modalType, setModalType] = useState<'employee' | 'shop'>('employee'); // Switcher

  // FORMS
  const [empFormData, setEmpFormData] = useState({
    name: '', position: '', contactNumber: '', shop: '', isActive: true
  });

  const [shopFormData, setShopFormData] = useState({
    name: '', address: '', contactNumber: '', isActive: true
  });

  // --- EMPLOYEE HANDLERS ---
  const handleAddEmployee = () => {
    setModalType('employee');
    setIsEditing(false);
    setEmpFormData({ name: '', position: '', contactNumber: '', shop: '', isActive: true });
    setIsDialogOpen(true);
  };

  const handleEditEmployee = (emp: any) => {
    setModalType('employee');
    setIsEditing(true);
    setCurrentId(emp.id);
    setEmpFormData({
        name: emp.name, position: emp.position, contactNumber: emp.contactNumber, shop: emp.shop, isActive: emp.isActive
    });
    setIsDialogOpen(true);
  };

  const handleDeleteEmployee = (id: string) => {
    if (confirm("Delete this employee?")) setEmployees(employees.filter(e => e.id !== id));
  };

  // --- SHOP HANDLERS ---
  const handleAddShop = () => {
    setModalType('shop');
    setIsEditing(false);
    setShopFormData({ name: '', address: '', contactNumber: '', isActive: true });
    setIsDialogOpen(true);
  };

  const handleEditShop = (shop: any) => {
    setModalType('shop');
    setIsEditing(true);
    setCurrentId(shop.id);
    setShopFormData({
        name: shop.name, address: shop.address, contactNumber: shop.contactNumber, isActive: shop.isActive
    });
    setIsDialogOpen(true);
  };

  const handleDeleteShop = (id: string) => {
    if (confirm("Delete this shop?")) setShops(shops.filter(s => s.id !== id));
  };

  // --- UNIFIED SAVE ---
  const handleSave = () => {
    if (modalType === 'employee') {
        // SAVE EMPLOYEE
        if (!empFormData.name) return alert("Name required");
        
        if (isEditing && currentId) {
            setEmployees(employees.map(e => e.id === currentId ? { ...e, ...empFormData } : e));
        } else {
            setEmployees([...employees, { ...empFormData, id: Date.now().toString() }]);
        }
    } else {
        // SAVE SHOP
        if (!shopFormData.name) return alert("Shop Name required");

        if (isEditing && currentId) {
            setShops(shops.map(s => s.id === currentId ? { ...s, ...shopFormData, employeeCount: s.employeeCount } : s));
        } else {
            setShops([...shops, { ...shopFormData, id: Date.now().toString(), employeeCount: 0 }]);
        }
    }
    setIsDialogOpen(false);
  };

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(employeeSearch.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-950 p-6 space-y-8">
        
        {

        }
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Employees & Shop Management</h1>
          <p className="text-slate-400 mt-1">Manage your workforce and shop locations</p>
        </div>

        {

        }
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="bg-slate-900 border-slate-800 text-white">
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? 'Edit' : 'Add New'} {modalType === 'employee' ? 'Employee' : 'Shop'}
                    </DialogTitle>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                    {modalType === 'employee' ? (
                  
                        <>
                            <div className="grid gap-2">
                                <Label>Full Name</Label>
                                <Input value={empFormData.name} onChange={(e) => setEmpFormData({...empFormData, name: e.target.value})} className="bg-slate-800 border-slate-700" placeholder="e.g. Juan dela Cruz"/>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label>Position</Label>
                                    <Input value={empFormData.position} onChange={(e) => setEmpFormData({...empFormData, position: e.target.value})} className="bg-slate-800 border-slate-700" placeholder="e.g. Tech"/>
                                </div>
                                <div className="grid gap-2">
                                    <Label>Contact No.</Label>
                                    <Input value={empFormData.contactNumber} onChange={(e) => setEmpFormData({...empFormData, contactNumber: e.target.value})} className="bg-slate-800 border-slate-700" placeholder="09XX..."/>
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label>Assigned Shop</Label>
                                <Select value={empFormData.shop} onValueChange={(val) => setEmpFormData({...empFormData, shop: val})}>
                                    <SelectTrigger className="bg-slate-800 border-slate-700"><SelectValue placeholder="Select Shop" /></SelectTrigger>
                                    <SelectContent className="bg-slate-800 border-slate-700 text-white">
                                        {shops.map(s => <SelectItem key={s.id} value={s.name}>{s.name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label>Status</Label>
                                <Select value={empFormData.isActive ? "active" : "inactive"} onValueChange={(val) => setEmpFormData({...empFormData, isActive: val === "active"})}>
                                    <SelectTrigger className="bg-slate-800 border-slate-700"><SelectValue /></SelectTrigger>
                                    <SelectContent className="bg-slate-800 border-slate-700 text-white">
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </>
                    ) : (
                       
                        <>
                            <div className="grid gap-2">
                                <Label>Shop Name</Label>
                                <Input value={shopFormData.name} onChange={(e) => setShopFormData({...shopFormData, name: e.target.value})} className="bg-slate-800 border-slate-700" placeholder="e.g. Main Branch"/>
                            </div>
                            <div className="grid gap-2">
                                <Label>Address</Label>
                                <Input value={shopFormData.address} onChange={(e) => setShopFormData({...shopFormData, address: e.target.value})} className="bg-slate-800 border-slate-700" placeholder="Complete Address"/>
                            </div>
                            <div className="grid gap-2">
                                <Label>Contact Number</Label>
                                <Input value={shopFormData.contactNumber} onChange={(e) => setShopFormData({...shopFormData, contactNumber: e.target.value})} className="bg-slate-800 border-slate-700" placeholder="Telephone / Mobile"/>
                            </div>
                            <div className="grid gap-2">
                                <Label>Status</Label>
                                <Select value={shopFormData.isActive ? "active" : "inactive"} onValueChange={(val) => setShopFormData({...shopFormData, isActive: val === "active"})}>
                                    <SelectTrigger className="bg-slate-800 border-slate-700"><SelectValue /></SelectTrigger>
                                    <SelectContent className="bg-slate-800 border-slate-700 text-white">
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </>
                    )}
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-slate-700 text-white hover:bg-slate-800">Cancel</Button>
                    <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-white">
                        <Save className="w-4 h-4 mr-2" /> Save Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        {/* TABS SECTION */}
        <Tabs defaultValue="employees" className="space-y-6">
          <TabsList className="bg-slate-900 border border-slate-800 text-slate-400 p-1">
            <TabsTrigger value="employees" className="flex items-center gap-2 data-[state=active]:bg-slate-800 data-[state=active]:text-white">
              <Users className="w-4 h-4" /> Employees
            </TabsTrigger>
            <TabsTrigger value="shops" className="flex items-center gap-2 data-[state=active]:bg-slate-800 data-[state=active]:text-white">
              <Building2 className="w-4 h-4" /> Shops
            </TabsTrigger>
          </TabsList>

          {/* EMPLOYEES TAB */}
          <TabsContent value="employees">
            <Card className="bg-slate-900 border-slate-800 shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Employee List</CardTitle>
                    <CardDescription className="text-slate-400">Manage technicians and staff</CardDescription>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="relative w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <Input
                        placeholder="Search employees..."
                        className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-primary focus:ring-primary/20"
                        value={employeeSearch}
                        onChange={(e) => setEmployeeSearch(e.target.value)}
                      />
                    </div>
                    <Button onClick={handleAddEmployee} className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
                      <Plus className="w-4 h-4 mr-2" /> Add Employee
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-slate-800 overflow-hidden">
                  <Table>
                    <TableHeader className="bg-slate-800/50">
                      <TableRow className="border-slate-800 hover:bg-slate-800/50">
                        <TableHead className="text-slate-300 font-semibold">Name</TableHead>
                        <TableHead className="text-slate-300 font-semibold">Position</TableHead>
                        <TableHead className="text-slate-300 font-semibold">Contact</TableHead>
                        <TableHead className="text-slate-300 font-semibold">Assigned Shop</TableHead>
                        <TableHead className="text-slate-300 font-semibold">Status</TableHead>
                        <TableHead className="text-right text-slate-300 font-semibold">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredEmployees.map((employee) => (
                            <TableRow key={employee.id} className="border-slate-800 hover:bg-slate-800/30 transition-colors">
                            <TableCell>
                                <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700">
                                    <span className="text-sm font-bold text-primary">{employee.name.charAt(0)}</span>
                                </div>
                                <span className="font-medium text-white">{employee.name}</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-slate-300">{employee.position}</TableCell>
                            <TableCell className="text-slate-400 text-sm"><Phone className="w-3 h-3 inline mr-1"/>{employee.contactNumber}</TableCell>
                            <TableCell className="text-slate-300 text-sm"><Building2 className="w-3 h-3 inline mr-1"/>{employee.shop}</TableCell>
                            <TableCell>
                                <Badge variant="outline" className={employee.isActive ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400" : "border-slate-500/20 bg-slate-500/10 text-slate-400"}>
                                {employee.isActive ? 'Active' : 'Inactive'}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <div className="flex justify-end gap-2">
                                <Button onClick={() => handleEditEmployee(employee)} variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
                                    <Edit className="w-4 h-4" />
                                </Button>
                                <Button onClick={() => handleDeleteEmployee(employee.id)} variant="ghost" size="icon" className="text-slate-400 hover:text-red-400 hover:bg-red-500/10">
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
          </TabsContent>

          {/* SHOPS TAB */}
          <TabsContent value="shops">
            <div className="grid gap-6">
              <div className="flex justify-end">
                <Button onClick={handleAddShop} className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
                  <Plus className="w-4 h-4 mr-2" /> Add Shop
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {shops.map((shop) => (
                  <Card key={shop.id} className="bg-slate-900 border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700">
                            <Building2 className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg text-white">{shop.name}</CardTitle>
                            <Badge variant="outline" className={`mt-2 ${shop.isActive ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400" : "border-slate-500/20 bg-slate-500/10 text-slate-400"}`}>
                              {shop.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button onClick={() => handleEditShop(shop)} variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button onClick={() => handleDeleteShop(shop.id)} variant="ghost" size="icon" className="text-slate-400 hover:text-red-400 hover:bg-red-500/10">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4 pt-2">
                        <div className="flex items-center gap-3 text-slate-400 bg-slate-800/50 p-3 rounded-lg border border-slate-800">
                          <MapPin className="w-4 h-4 text-primary" /> <span>{shop.address}</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-400 bg-slate-800/50 p-3 rounded-lg border border-slate-800">
                          <Phone className="w-4 h-4 text-primary" /> <span>{shop.contactNumber}</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-400 bg-slate-800/50 p-3 rounded-lg border border-slate-800">
                          <Users className="w-4 h-4 text-primary" /> <span>{shop.employeeCount} employees assigned</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}