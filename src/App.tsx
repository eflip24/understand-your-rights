import { Suspense, useEffect } from "react";
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
import LegalChatWidget from "@/components/chat/LegalChatWidget";
import AppRoutes from "@/AppRoutes";
import LocaleSync from "@/i18n/LocaleSync";
import { supabase } from "@/integrations/supabase/client";
import { setRuntimeRegionIntros } from "@/data/eu/regionIntros";
import { initAutoAds, shouldShowAds } from "@/lib/adsense";
import { useConsent } from "@/lib/consent";
import { useLocation } from "react-router-dom";
import "@/i18n/config";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent" />
  </div>
);

const App = () => {
  useEffect(() => {
    let cancelled = false;
    supabase
      .from("region_intros_runtime")
      .select("country, region_canonical, locale, text")
      .then(({ data }) => {
        if (!cancelled && data) setRuntimeRegionIntros(data);
      });
    return () => { cancelled = true; };
  }, []);
  return (

  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <LocaleSync />
            <ScrollToTop />
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    {/* Non-default locales mount the same tree under a prefix.
                        React Router v6 has no inline regex, so list explicitly. */}
                    <Route path="/es/*" element={<AppRoutes />} />
                    <Route path="/fr/*" element={<AppRoutes />} />
                    <Route path="/de/*" element={<AppRoutes />} />
                    <Route path="/pt/*" element={<AppRoutes />} />
                    <Route path="/it/*" element={<AppRoutes />} />
                    {/* English (default) — no prefix, preserves existing URLs. */}
                    <Route path="/*" element={<AppRoutes />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
            </div>
            <LegalChatWidget />
            {/* Cookie consent now handled by Google Funding Choices (TCF v2.2) loaded in index.html */}
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
  );
};


export default App;
