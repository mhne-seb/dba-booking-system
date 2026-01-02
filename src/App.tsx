import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import BookService from "./pages/BookService";
import Dashboard from "./pages/dashboard/Dashboard";
import Customers from "./pages/dashboard/Customers";
import ServiceRequests from "./pages/dashboard/ServiceRequests";
import Bookings from "./pages/dashboard/Bookings";
import Management from "./pages/dashboard/Management";
import Reports from "./pages/dashboard/Reports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/book" element={<BookService />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/customers" element={<Customers />} />
            <Route path="/dashboard/requests" element={<ServiceRequests />} />
            <Route path="/dashboard/bookings" element={<Bookings />} />
            <Route path="/dashboard/management" element={<Management />} />
            <Route path="/dashboard/reports" element={<Reports />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
