import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { ProductSelectionProvider } from "@/context/ProductSelectionContext";
import { WishlistProvider } from "@/context/WishlistContext";
import Layout from "@/components/layout/Layout";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import ProductsPage from "@/pages/ProductsPage";
import WhyChooseUsPage from "@/pages/WhyChooseUsPage";
import EnquirySummaryPage from "@/pages/EnquirySummaryPage";
import ContactPage from "@/pages/ContactPage";
import LightingCalculatorPage from "@/pages/LightingCalculatorPage";
import WishlistPage from "@/pages/WishlistPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ProductSelectionProvider>
          <WishlistProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Layout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/why-choose-us" element={<WhyChooseUsPage />} />
                  <Route path="/enquiry-summary" element={<EnquirySummaryPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/lighting-calculator" element={<LightingCalculatorPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            </BrowserRouter>
          </WishlistProvider>
        </ProductSelectionProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
