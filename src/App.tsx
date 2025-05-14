
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";

// Pages
import HomePage from "./pages/HomePage";
import ToolsPage from "./pages/ToolsPage";
import ToolDetailPage from "./pages/ToolDetailPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import BookmarksPage from "./pages/BookmarksPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsPage from "./pages/TermsPage";
import DisclaimerPage from "./pages/DisclaimerPage";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/common/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Layout>
        <ScrollToTop/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/tools/category/:categorySlug" element={<ToolsPage />} />
          <Route path="/tools/:slug" element={<ToolDetailPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/bookmarks" element={<BookmarksPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-and-conditions" element={<TermsPage />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
