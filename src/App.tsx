import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import EndUserDashboard from "./pages/end-user/Dashboard";
import TechnicianDashboard from "./pages/technician/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import NotFound from "./pages/NotFound";

// Layouts
import EndUserLayout from "./components/layouts/EndUserLayout";
import TechnicianLayout from "./components/layouts/TechnicianLayout";
import AdminLayout from "./components/layouts/AdminLayout";

const queryClient = new QueryClient();

function AppRoutes() {
  return (
    <Routes>
      {/* Default redirect to end user */}
      <Route path="/" element={<Navigate to="/report-issue" replace />} />
      
      {/* End User Routes */}
      <Route path="/report-issue" element={
        <EndUserLayout><EndUserDashboard page="report" /></EndUserLayout>
      } />
      <Route path="/service-status" element={
        <EndUserLayout><EndUserDashboard page="status" /></EndUserLayout>
      } />
      <Route path="/my-system" element={
        <EndUserLayout><EndUserDashboard page="system" /></EndUserLayout>
      } />
      <Route path="/call-help" element={
        <EndUserLayout><EndUserDashboard page="call" /></EndUserLayout>
      } />
      <Route path="/notifications" element={
        <EndUserLayout><EndUserDashboard page="notifications" /></EndUserLayout>
      } />
      <Route path="/language" element={
        <EndUserLayout><EndUserDashboard page="language" /></EndUserLayout>
      } />
      <Route path="/help" element={
        <EndUserLayout><EndUserDashboard page="help" /></EndUserLayout>
      } />
      
      {/* Technician Routes */}
      <Route path="/technician" element={<Navigate to="/technician/jobs" replace />} />
      <Route path="/technician/jobs" element={
        <TechnicianLayout><TechnicianDashboard page="jobs" /></TechnicianLayout>
      } />
      <Route path="/technician/active-job" element={
        <TechnicianLayout><TechnicianDashboard page="active" /></TechnicianLayout>
      } />
      <Route path="/technician/complete-job" element={
        <TechnicianLayout><TechnicianDashboard page="complete" /></TechnicianLayout>
      } />
      <Route path="/technician/completed" element={
        <TechnicianLayout><TechnicianDashboard page="completed" /></TechnicianLayout>
      } />
      <Route path="/technician/earnings" element={
        <TechnicianLayout><TechnicianDashboard page="earnings" /></TechnicianLayout>
      } />
      <Route path="/technician/rating" element={
        <TechnicianLayout><TechnicianDashboard page="rating" /></TechnicianLayout>
      } />
      <Route path="/technician/training" element={
        <TechnicianLayout><TechnicianDashboard page="training" /></TechnicianLayout>
      } />
      <Route path="/technician/notifications" element={
        <TechnicianLayout><TechnicianDashboard page="notifications" /></TechnicianLayout>
      } />
      <Route path="/technician/profile" element={
        <TechnicianLayout><TechnicianDashboard page="profile" /></TechnicianLayout>
      } />
      <Route path="/technician/knowledge" element={
        <TechnicianLayout><TechnicianDashboard page="knowledge" /></TechnicianLayout>
      } />
      
      {/* Admin Routes */}
      <Route path="/admin" element={<Navigate to="/admin/tickets" replace />} />
      <Route path="/admin/tickets" element={
        <AdminLayout><AdminDashboard page="tickets" /></AdminLayout>
      } />
      <Route path="/admin/map" element={
        <AdminLayout><AdminDashboard page="map" /></AdminLayout>
      } />
      <Route path="/admin/technicians" element={
        <AdminLayout><AdminDashboard page="technicians" /></AdminLayout>
      } />
      <Route path="/admin/assignments" element={
        <AdminLayout><AdminDashboard page="assignments" /></AdminLayout>
      } />
      <Route path="/admin/sla" element={
        <AdminLayout><AdminDashboard page="sla" /></AdminLayout>
      } />
      <Route path="/admin/systems" element={
        <AdminLayout><AdminDashboard page="systems" /></AdminLayout>
      } />
      <Route path="/admin/reports" element={
        <AdminLayout><AdminDashboard page="reports" /></AdminLayout>
      } />
      <Route path="/admin/settings" element={
        <AdminLayout><AdminDashboard page="settings" /></AdminLayout>
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
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
