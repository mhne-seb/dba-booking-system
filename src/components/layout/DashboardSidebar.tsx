import { useState } from 'react'; 
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  ClipboardList, 
  Calendar, 
  Building2, 
  FileText,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'; 
import autocareLogo from '@/assets/autocare_logo.png';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Users, label: 'Customer Information', path: '/dashboard/customers' },
  { icon: ClipboardList, label: 'Service Requests', path: '/dashboard/requests' },
  { icon: Calendar, label: 'Booking & Scheduling', path: '/dashboard/bookings' },
  { icon: Building2, label: 'Employees & Shop', path: '/dashboard/management' },
  { icon: FileText, label: 'History & Reports', path: '/dashboard/reports' },
];

export function DashboardSidebar() {
  const location = useLocation();
  const navigate = useNavigate(); 
  const { logout, user } = useAuth();
  
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const handleConfirmLogout = () => {
    logout(); 
    setIsLogoutOpen(false);
    navigate('/'); 
  };

  return (
    <>
      <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 border-r border-slate-800 flex flex-col transition-all duration-300 shadow-2xl z-50">
        
        {

        }
        <div className="h-24 flex items-center justify-center border-b border-slate-800/50 p-4">
          <Link to="/dashboard" className="transition-transform duration-300 hover:scale-105">
            <img 
              src={autocareLogo} 
              alt="AutoCare Logo" 
              className="h-20 w-auto object-contain drop-shadow-lg" 
            />
          </Link>
        </div>

        {

        }
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden",
                  isActive 
                    ? "bg-primary text-white shadow-lg shadow-primary/25 font-semibold" 
                    : "text-slate-400 hover:bg-slate-800 hover:text-white hover:translate-x-1"
                )}
              >
                {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/20" />}
                
                <item.icon className={cn("w-5 h-5 transition-colors", isActive ? "text-white" : "text-slate-500 group-hover:text-white")} />
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {
          
        }
        <div className="p-4 border-t border-slate-800 bg-slate-900/50">
          <div className="mb-4 px-2 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-blue-400 flex items-center justify-center text-white font-bold shadow-lg">
               {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-white truncate">{user?.name || 'Admin User'}</p>
              <p className="text-xs text-slate-500 truncate">{user?.email || 'admin@autocare.com'}</p>
            </div>
          </div>
          
          {

          }
          <Button 
            variant="ghost" 
            className="w-full justify-start text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
            onClick={() => setIsLogoutOpen(true)}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </aside>

      {
        
      }
      <Dialog open={isLogoutOpen} onOpenChange={setIsLogoutOpen}>
        <DialogContent className="bg-slate-900 border-slate-800 text-white sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">Confirm Logout</DialogTitle>
            <DialogDescription className="text-slate-400">
              Are you sure you want to log out? You will be redirected to the landing page.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 sm:justify-end mt-4">
            <Button 
              variant="outline" 
              onClick={() => setIsLogoutOpen(false)} 
              className="border-slate-700 text-white hover:bg-slate-800 hover:text-white"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmLogout} 
              className="bg-red-600 hover:bg-red-700 text-white border-none"
            >
              Log Out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}