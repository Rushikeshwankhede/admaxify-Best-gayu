
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

import Index from "./pages/Index";
import Services from "./pages/Services";
import Testimonials from "./pages/Testimonials";
import TestimonialDetail from "./pages/TestimonialDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import BookStrategyCall from "./pages/BookStrategyCall";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminServices from "./pages/admin/AdminServices";
import AdminServicesManagement from "./pages/admin/AdminServicesManagement";
import AdminTestimonialsManagement from "./pages/admin/AdminTestimonialsManagement";
import AdminContactSubmissions from "./pages/admin/AdminContactSubmissions";
import AdminStrategyCallBookings from "./pages/admin/AdminStrategyCallBookings";
import AdminAboutUsManagement from "./pages/admin/AdminAboutUsManagement";
import ResetPassword from "./pages/admin/ResetPassword";
import ProtectedRoute from "./components/admin/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000,
      refetchOnWindowFocus: true,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/testimonials/:id" element={<TestimonialDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book-strategy-call" element={<BookStrategyCall />} />
            
            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/reset-password" element={<ResetPassword />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/services" element={
              <ProtectedRoute requiredRole="editor">
                <AdminServices />
              </ProtectedRoute>
            } />
            
            {/* Admin Management Routes */}
            <Route path="/admin/services-management" element={
              <ProtectedRoute requiredRole="editor">
                <AdminServicesManagement />
              </ProtectedRoute>
            } />
            <Route path="/admin/testimonials-management" element={
              <ProtectedRoute requiredRole="editor">
                <AdminTestimonialsManagement />
              </ProtectedRoute>
            } />
            <Route path="/admin/contact-submissions" element={
              <ProtectedRoute requiredRole="viewer">
                <AdminContactSubmissions />
              </ProtectedRoute>
            } />
            <Route path="/admin/strategy-call-bookings" element={
              <ProtectedRoute requiredRole="viewer">
                <AdminStrategyCallBookings />
              </ProtectedRoute>
            } />
            <Route path="/admin/about-us-management" element={
              <ProtectedRoute requiredRole="editor">
                <AdminAboutUsManagement />
              </ProtectedRoute>
            } />
            
            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
