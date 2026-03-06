import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import MongoMessagesPage from './pages/MongoMessagesPage';
import PlaceholderPage from './pages/PlaceholderPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import SiteSettings from './pages/admin/SiteSettings';
import NavigationManager from './pages/admin/NavigationManager';
import HeroManager from './pages/admin/HeroManager';
import HighlightsManager from './pages/admin/HighlightsManager';
import CategoriesManager from './pages/admin/CategoriesManager';
import ServicesManager from './pages/admin/ServicesManager';
import TestimonialsManager from './pages/admin/TestimonialsManager';
import CTAButtonsManager from './pages/admin/CTAButtonsManager';
import FooterManager from './pages/admin/FooterManager';
import NewsletterSubmissions from './pages/admin/NewsletterSubmissions';
import './index.css';

function ProtectedRoute({ children }) {
  const { admin, loading } = useAuth();
  if (loading) return <div className="loading" style={{ minHeight: '100vh' }}><div className="spinner" /></div>;
  return admin ? children : <Navigate to="/admin" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<HomePage />} />
      <Route path="/category/:slug" element={<CategoryPage />} />
      <Route path="/mongo-page" element={<MongoMessagesPage />} />

      {/* Admin Login */}
      <Route path="/admin" element={<AdminLogin />} />

      {/* Admin Panel */}
      <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="settings" element={<SiteSettings />} />
        <Route path="navigation" element={<NavigationManager />} />
        <Route path="hero" element={<HeroManager />} />
        <Route path="highlights" element={<HighlightsManager />} />
        <Route path="categories" element={<CategoriesManager />} />
        <Route path="services" element={<ServicesManager />} />
        <Route path="testimonials" element={<TestimonialsManager />} />
        <Route path="cta-buttons" element={<CTAButtonsManager />} />
        <Route path="footer" element={<FooterManager />} />
        <Route path="newsletter" element={<NewsletterSubmissions />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<PlaceholderPage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
