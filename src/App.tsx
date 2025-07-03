
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";

// Pages
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import ToolsPage from "./pages/ToolsPage";
import ToolDetailPage from "./pages/ToolDetailPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import BookmarksPage from "./pages/BookmarksPage";
import SavedToolsPage from "./pages/SavedToolsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsPage from "./pages/TermsPage";
import DisclaimerPage from "./pages/DisclaimerPage";
import NotFound from "./pages/NotFound";
import CompareToolsPage from "./pages/CompareToolsPage";
import TrendingToolsPage from "./pages/TrendingToolsPage";
import SubmitToolPage from "./pages/SubmitToolPage";
import ScrollToTop from "./components/common/ScrollToTop";

// Create a new query client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        {/* Landing page without layout */}
        <Route path="/landing" element={<LandingPage />} />
        
        {/* All other routes with layout */}
        <Route path="/*" element={
          <Layout>
            <ScrollToTop/>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/tools" element={<ToolsPage />} />
              <Route path="/tools/category/:categorySlug" element={<ToolsPage />} />
              <Route path="/tools/:slug" element={<ToolDetailPage />} />
              <Route path="/compare/:slugs" element={<CompareToolsPage />} />
              <Route path="/saved-tools" element={<SavedToolsPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/bookmarks" element={<BookmarksPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/trending-tools" element={<TrendingToolsPage />} />
              <Route path="/submit-tool" element={<SubmitToolPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-and-conditions" element={<TermsPage />} />
              <Route path="/disclaimer" element={<DisclaimerPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
