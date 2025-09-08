import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Layout } from "./components/Layout";

// Import your page components
import PatientsPage from "./pages/patientsPage";
import Appointments from "./pages/Appointments";
import MedicalRecords from "./pages/MedicalRecords";
import ReportsPage from "./pages/ReportsPage";
import ProfilePage from "./pages/ProfilePage";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout title="Dashboard" subtitle="Welcome back, Dr. Abas">
                <Index />
              </Layout>
            }
          />
          <Route
            path="/patients"
            element={
              <Layout title="Patients" subtitle="Manage patient records">
                <PatientsPage />
              </Layout>
            }
          />
          <Route
            path="/appointments"
            element={
              <Layout title="Appointments" subtitle="Clinic Schedule">
                <Appointments />
              </Layout>
            }
          />
          <Route
            path="/records"
            element={
              <Layout title="Medical Records" subtitle="Patients Medical Records">
                <MedicalRecords />
              </Layout>
            }
          />
          <Route
            path="/reports"
            element={
              <Layout title="Reports" subtitle="Clinical Reports">
                <ReportsPage />
              </Layout>
            }
          />
          {/* New Profile Route */}
          <Route
            path="/profile"
            element={
              <Layout title="Profile" subtitle="Manage your account settings">
                <ProfilePage />
              </Layout>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);