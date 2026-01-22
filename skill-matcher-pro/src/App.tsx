import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SelectPage from "./pages/SelectPage";
import ProfilePage from "./pages/ProfilePage";
import DashboardPage from "./pages/DashboardPage";
import DSAPage from "./pages/DSAPage";
import PlanPage from "./pages/PlanPage";
import SimulatorPage from "./pages/SimulatorPage";
import AnalyzerPage from "./pages/AnalyzerPage";
import MySkillsPage from "./pages/MySkillsPage";
import NotFound from "./pages/NotFound";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/select" element={
              <ProtectedRoute>
                <SelectPage />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
            <Route path="/dsa" element={
              <ProtectedRoute>
                <DSAPage />
              </ProtectedRoute>
            } />
            <Route path="/plan" element={
              <ProtectedRoute>
                <PlanPage />
              </ProtectedRoute>
            } />
            <Route path="/simulator" element={
              <ProtectedRoute>
                <SimulatorPage />
              </ProtectedRoute>
            } />
            <Route path="/analyzer" element={
              <ProtectedRoute>
                <AnalyzerPage />
              </ProtectedRoute>
            } />
            <Route path="/my-skills" element={
              <ProtectedRoute>
                <MySkillsPage />
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
