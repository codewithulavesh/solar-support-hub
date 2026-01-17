import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

// Pages
import AuthPage from "./pages/Auth";
import EndUserDashboard from "./pages/end-user/Dashboard";
import TechnicianDashboard from "./pages/technician/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import NotFound from "./pages/NotFound";

// Layouts
import EndUserLayout from "./components/layouts/EndUserLayout";
import TechnicianLayout from "./components/layouts/TechnicianLayout";
import AdminLayout from "./components/layouts/AdminLayout";

import { Loader2 } from "lucide-react";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
}

function RoleBasedRedirect() {
  const { role, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }
  
  switch (role) {
    case 'admin':
    case 'coordinator':
      return <Navigate to="/admin/tickets" replace />;
    case 'technician':
      return <Navigate to="/technician/jobs" replace />;
    default:
      return <Navigate to="/report-issue" replace />;
  }
}

function AppRoutes() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/auth" element={<AuthPage />} />
      
      {/* Role-based redirect */}
      <Route path="/" element={
        <ProtectedRoute>
          <RoleBasedRedirect />
        </ProtectedRoute>
      } />
      
      {/* End User Routes */}
      <Route path="/report-issue" element={
        <ProtectedRoute>
          <EndUserLayout><EndUserDashboard page="report" /></EndUserLayout>
        </ProtectedRoute>
      } />
      <Route path="/service-status" element={
        <ProtectedRoute>
          <EndUserLayout><EndUserDashboard page="status" /></EndUserLayout>
        </ProtectedRoute>
      } />
      <Route path="/my-system" element={
        <ProtectedRoute>
          <EndUserLayout><EndUserDashboard page="system" /></EndUserLayout>
        </ProtectedRoute>
      } />
      <Route path="/call-help" element={
        <ProtectedRoute>
          <EndUserLayout><EndUserDashboard page="call" /></EndUserLayout>
        </ProtectedRoute>
      } />
      <Route path="/notifications" element={
        <ProtectedRoute>
          <EndUserLayout><EndUserDashboard page="notifications" /></EndUserLayout>
        </ProtectedRoute>
      } />
      <Route path="/language" element={
        <ProtectedRoute>
          <EndUserLayout><EndUserDashboard page="language" /></EndUserLayout>
        </ProtectedRoute>
      } />
      <Route path="/help" element={
        <ProtectedRoute>
          <EndUserLayout><EndUserDashboard page="help" /></EndUserLayout>
        </ProtectedRoute>
      } />
      
      {/* Technician Routes */}
      <Route path="/technician/jobs" element={
        <ProtectedRoute>
          <TechnicianLayout><TechnicianDashboard page="jobs" /></TechnicianLayout>
        </ProtectedRoute>
      } />
      <Route path="/technician/active-job" element={
        <ProtectedRoute>
          <TechnicianLayout><TechnicianDashboard page="active" /></TechnicianLayout>
        </ProtectedRoute>
      } />
      <Route path="/technician/complete-job" element={
        <ProtectedRoute>
          <TechnicianLayout><TechnicianDashboard page="complete" /></TechnicianLayout>
        </ProtectedRoute>
      } />
      <Route path="/technician/completed" element={
        <ProtectedRoute>
          <TechnicianLayout><TechnicianDashboard page="completed" /></TechnicianLayout>
        </ProtectedRoute>
      } />
      <Route path="/technician/earnings" element={
        <ProtectedRoute>
          <TechnicianLayout><TechnicianDashboard page="earnings" /></TechnicianLayout>
        </ProtectedRoute>
      } />
      <Route path="/technician/rating" element={
        <ProtectedRoute>
          <TechnicianLayout><TechnicianDashboard page="rating" /></TechnicianLayout>
        </ProtectedRoute>
      } />
      <Route path="/technician/training" element={
        <ProtectedRoute>
          <TechnicianLayout><TechnicianDashboard page="training" /></TechnicianLayout>
        </ProtectedRoute>
      } />
      <Route path="/technician/notifications" element={
        <ProtectedRoute>
          <TechnicianLayout><TechnicianDashboard page="notifications" /></TechnicianLayout>
        </ProtectedRoute>
      } />
      <Route path="/technician/profile" element={
        <ProtectedRoute>
          <TechnicianLayout><TechnicianDashboard page="profile" /></TechnicianLayout>
        </ProtectedRoute>
      } />
      <Route path="/technician/knowledge" element={
        <ProtectedRoute>
          <TechnicianLayout><TechnicianDashboard page="knowledge" /></TechnicianLayout>
        </ProtectedRoute>
      } />
      
      {/* Admin Routes */}
      <Route path="/admin/tickets" element={
        <ProtectedRoute>
          <AdminLayout><AdminDashboard page="tickets" /></AdminLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin/map" element={
        <ProtectedRoute>
          <AdminLayout><AdminDashboard page="map" /></AdminLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin/technicians" element={
        <ProtectedRoute>
          <AdminLayout><AdminDashboard page="technicians" /></AdminLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin/assignments" element={
        <ProtectedRoute>
          <AdminLayout><AdminDashboard page="assignments" /></AdminLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin/sla" element={
        <ProtectedRoute>
          <AdminLayout><AdminDashboard page="sla" /></AdminLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin/systems" element={
        <ProtectedRoute>
          <AdminLayout><AdminDashboard page="systems" /></AdminLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin/reports" element={
        <ProtectedRoute>
          <AdminLayout><AdminDashboard page="reports" /></AdminLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin/settings" element={
        <ProtectedRoute>
          <AdminLayout><AdminDashboard page="settings" /></AdminLayout>
        </ProtectedRoute>
      } />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
