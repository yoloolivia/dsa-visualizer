
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CategoryPage from "./pages/CategoryPage";
import StackPage from "./pages/StackPage";
import QueuePage from "./pages/QueuePage";
import ArrayPage from "./pages/ArrayPage";
import LinkedListPage from "./pages/LinkedListPage";
import BinaryTreePage from "./pages/BinaryTreePage";
import BSTPage from "./pages/BSTPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Category Routes */}
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          
          {/* Visualizer Routes */}
          <Route path="/visualizer/stack" element={<StackPage />} />
          <Route path="/visualizer/queue" element={<QueuePage />} />
          <Route path="/visualizer/array" element={<ArrayPage />} />
          <Route path="/visualizer/linked-list" element={<LinkedListPage />} />
          <Route path="/visualizer/binary-tree" element={<BinaryTreePage />} />
          <Route path="/visualizer/bst" element={<BSTPage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
