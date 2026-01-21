import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import LandingPage from "./pages/LandingPage";
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
            <Route path="/" element={<LandingPage />} />
            <Route path="/select" element={<SelectPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dsa" element={<DSAPage />} />
            <Route path="/plan" element={<PlanPage />} />
            <Route path="/simulator" element={<SimulatorPage />} />
            <Route path="/analyzer" element={<AnalyzerPage />} />
            <Route path="/my-skills" element={<MySkillsPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
