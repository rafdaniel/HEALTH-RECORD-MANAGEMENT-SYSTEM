import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Placeholder from "./pages/Placeholder";
import { Layout } from "./components/Layout";

// 1. Import your new PatientsPage component
// (Assuming it's in the 'pages' folder and has a default export)
import PatientsPage from "./pages/patientsPage";

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
              <Layout title="Dashboard" subtitle="Welcome back, Dr. Smith">
                <Index />
              </Layout>
            }
          />
          <Route
            path="/patients"
            element={
              // 2. Use your new component and wrap it in the Layout
              <Layout title="Patients" subtitle="Manage patient records">
                <PatientsPage />
              </Layout>
            }
          />
          <Route
            path="/appointments"
            element={<Placeholder pageName="Appointments" />}
          />
          <Route
            path="/records"
            element={<Placeholder pageName="Medical Records" />}
          />
          <Route
            path="/prescriptions"
            element={<Placeholder pageName="Prescriptions" />}
          />
          <Route
            path="/reports"
            element={<Placeholder pageName="Reports" />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
