import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { DashboardSidebar } from './DashboardSidebar';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    
    <div className="min-h-screen bg-slate-950 flex"> 
      <DashboardSidebar />
      <main className="flex-1 ml-64 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}