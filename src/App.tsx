import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HomePage from "@/pages/HomePage";
import ToolsDirectory from "@/pages/ToolsDirectory";
import CategoryPage from "@/pages/CategoryPage";
import ToolPage from "@/pages/ToolPage";
import LegalTermsDirectory from "@/pages/LegalTermsDirectory";
import LegalTermPage from "@/pages/LegalTermPage";
import LegalClausesDirectory from "@/pages/LegalClausesDirectory";
import LegalClausePage from "@/pages/LegalClausePage";
import ContractTypesDirectory from "@/pages/ContractTypesDirectory";
import ContractTypePage from "@/pages/ContractTypePage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import DashboardPage from "@/pages/DashboardPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
    <AuthProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/tools" element={<ToolsDirectory />} />
              <Route path="/tools/:category" element={<CategoryPage />} />
              <Route path="/tools/:category/:tool" element={<ToolPage />} />
              <Route path="/legal-terms" element={<LegalTermsDirectory />} />
              <Route path="/legal-terms/:slug" element={<LegalTermPage />} />
              <Route path="/legal-clauses" element={<LegalClausesDirectory />} />
              <Route path="/legal-clauses/:slug" element={<LegalClausePage />} />
              <Route path="/contract-types" element={<ContractTypesDirectory />} />
              <Route path="/contract-types/:slug" element={<ContractTypePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
    </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
