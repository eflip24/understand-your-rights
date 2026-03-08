import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ScrollToTop";

// Lazy-load all page components
const HomePage = React.lazy(() => import("@/pages/HomePage"));
const ToolsDirectory = React.lazy(() => import("@/pages/ToolsDirectory"));
const CategoryPage = React.lazy(() => import("@/pages/CategoryPage"));
const ToolPage = React.lazy(() => import("@/pages/ToolPage"));
const LegalTermsDirectory = React.lazy(() => import("@/pages/LegalTermsDirectory"));
const LegalTermPage = React.lazy(() => import("@/pages/LegalTermPage"));
const LegalClausesDirectory = React.lazy(() => import("@/pages/LegalClausesDirectory"));
const LegalClausePage = React.lazy(() => import("@/pages/LegalClausePage"));
const ContractTypesDirectory = React.lazy(() => import("@/pages/ContractTypesDirectory"));
const ContractTypePage = React.lazy(() => import("@/pages/ContractTypePage"));
const LoginPage = React.lazy(() => import("@/pages/LoginPage"));
const SignupPage = React.lazy(() => import("@/pages/SignupPage"));
const ForgotPasswordPage = React.lazy(() => import("@/pages/ForgotPasswordPage"));
const ResetPasswordPage = React.lazy(() => import("@/pages/ResetPasswordPage"));
const DashboardPage = React.lazy(() => import("@/pages/DashboardPage"));
const BlogPage = React.lazy(() => import("@/pages/BlogPage"));
const BlogPostPage = React.lazy(() => import("@/pages/BlogPostPage"));
const BlogCategoryPage = React.lazy(() => import("@/pages/BlogCategoryPage"));
const AdminLayout = React.lazy(() => import("@/pages/admin/AdminLayout"));
const AdminDashboard = React.lazy(() => import("@/pages/admin/AdminDashboard"));
const AdminBlogList = React.lazy(() => import("@/pages/admin/AdminBlogList"));
const AdminBlogEditor = React.lazy(() => import("@/pages/admin/AdminBlogEditor"));
const AdminCategories = React.lazy(() => import("@/pages/admin/AdminCategories"));
const NotFound = React.lazy(() => import("@/pages/NotFound"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
    <AuthProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            <Suspense fallback={<PageLoader />}>
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
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/category/:slug" element={<BlogCategoryPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
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
