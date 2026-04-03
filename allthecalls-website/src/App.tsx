import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import CheckoutPage from "./components/CheckoutPage";
import WelcomePage from "./components/WelcomePage";
import DemoPage from "./components/DemoPage";
import PrivacyPage from "./components/PrivacyPage";
import TermsPage from "./components/TermsPage";
import ContactPage from "./components/ContactPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/demo" element={<DemoPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
}
