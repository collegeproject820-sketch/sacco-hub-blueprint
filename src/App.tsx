import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AdminLayout } from "@/components/admin/AdminLayout";
import Index from "./pages/Index";
import About from "./pages/About";
import News from "./pages/News";
import NewsArticle from "./pages/NewsArticle";
import Events from "./pages/Events";
import Advertise from "./pages/Advertise";
import SubmitNews from "./pages/SubmitNews";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/Dashboard";
import NewsManagement from "./pages/admin/NewsManagement";
import UsersManagement from "./pages/admin/UsersManagement";
import AdvertsManagement from "./pages/admin/AdvertsManagement";
import EventsManagement from "./pages/admin/EventsManagement";
import SubmissionsManagement from "./pages/admin/SubmissionsManagement";
import SettingsManagement from "./pages/admin/SettingsManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:slug" element={<NewsArticle />} />
            <Route path="/events" element={<Events />} />
            <Route path="/advertise" element={<Advertise />} />
            <Route path="/submit-news" element={<SubmitNews />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminLayout><AdminDashboard /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/news" element={<ProtectedRoute requireAdmin><AdminLayout><NewsManagement /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute requireAdmin><AdminLayout><UsersManagement /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/adverts" element={<ProtectedRoute requireAdmin><AdminLayout><AdvertsManagement /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/events" element={<ProtectedRoute requireAdmin><AdminLayout><EventsManagement /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/submissions" element={<ProtectedRoute requireAdmin><AdminLayout><SubmissionsManagement /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute requireAdmin><AdminLayout><SettingsManagement /></AdminLayout></ProtectedRoute>} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
