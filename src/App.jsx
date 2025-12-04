import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import LandingPage from './pages/LandingPage';
import VerifyPage from './pages/VerifyPage';
import CommunityPage from './pages/CommunityPage';
import LiteEditPage from './pages/LiteEditPage';
import EditPage from './pages/EditPage';
import AdminPage from './pages/AdminPage';
import ComingSoonPage from './pages/ComingSoonPage';
import PricingPage from './pages/PricingPage';
import Footer from './components/Footer';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import TermsAndConditions from './pages/legal/TermsAndConditions';
import RefundPolicy from './pages/legal/RefundPolicy';
import ContactUs from './pages/legal/ContactUs';
import ShippingPolicy from './pages/legal/ShippingPolicy';

import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import AdminRoute from './components/AdminRoute';
import Toast from './components/Toast';
import { HelmetProvider } from 'react-helmet-async'; // Assuming this is the correct import for HelmetProvider

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-black text-white font-sans selection:bg-art-accent selection:text-white">
            <CustomCursor />
            <Navbar />
            <Toast />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
              <Route path="/verify/:token" element={<VerifyPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route
                path="/edit"
                element={
                  <PrivateRoute>
                    <EditPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/lite-edit"
                element={
                  <PrivateRoute>
                    <LiteEditPage />
                  </PrivateRoute>
                }
              />
               <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminPage />
                  </AdminRoute>
                }
              />
            <Route path="/product" element={<ComingSoonPage title="PRODUCT" />} />
              <Route path="/corporate" element={<ComingSoonPage title="CORPORATE" />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsAndConditions />} />
              <Route path="/refund" element={<RefundPolicy />} />
              <Route path="/shipping" element={<ShippingPolicy />} />
              <Route path="/contact" element={<ContactUs />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
