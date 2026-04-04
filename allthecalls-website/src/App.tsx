import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import LandingPage from "./components/LandingPage";
import CheckoutPage from "./components/CheckoutPage";
import WelcomePage from "./components/WelcomePage";
import DemoPage from "./components/DemoPage";
import PrivacyPage from "./components/PrivacyPage";
import TermsPage from "./components/TermsPage";
import ContactPage from "./components/ContactPage";

import LoginPage from "./components/auth/LoginPage";
import SignupPage from "./components/auth/SignupPage";

import OnboardingFlow from "./components/onboarding/OnboardingFlow";

import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardHome from "./components/dashboard/DashboardHome";
import CallHistory from "./components/dashboard/CallHistory";
import AgentSettings from "./components/dashboard/AgentSettings";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected onboarding */}
        <Route path="/onboarding" element={
          <ProtectedRoute><OnboardingFlow /></ProtectedRoute>
        } />

        {/* Protected dashboard */}
        <Route path="/dashboard" element={
          <ProtectedRoute><DashboardLayout /></ProtectedRoute>
        }>
          <Route index element={<DashboardHome />} />
          <Route path="calls" element={<CallHistory />} />
          <Route path="calls/:callId" element={<CallHistory />} />
          <Route path="settings" element={<AgentSettings />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}
