import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/components/AuthProvider";
import Index from "./pages/Index";
import Services from "./pages/Services";
import FAQ from "./pages/FAQ";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import CareerGuidance from "./pages/services/CareerGuidance";
import IndianAdmission from "./pages/services/IndianAdmission";
import OverseasAdmission from "./pages/services/OverseasAdmission";
import OnlineAdmission from "./pages/services/OnlineAdmission";
import TestPreparation from "./pages/services/TestPreparation";
import EducationalLoans from "./pages/services/EducationalLoans";

const queryClient = new QueryClient();

import SEO from "@/components/SEO";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <SEO />
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/services/career-guidance" element={<CareerGuidance />} />
              <Route path="/services/indian-admission" element={<IndianAdmission />} />
              <Route path="/services/overseas-admission" element={<OverseasAdmission />} />
              <Route path="/services/online-admission" element={<OnlineAdmission />} />
              <Route path="/services/test-preparation" element={<TestPreparation />} />
              <Route path="/services/educational-loans" element={<EducationalLoans />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
