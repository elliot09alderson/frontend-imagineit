import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import LandingPage from './pages/LandingPage';
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

import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-black text-white font-sans selection:bg-art-accent selection:text-white">
          <CustomCursor />
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
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
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
