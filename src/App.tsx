import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { LandingHome } from "./pages/LandingHome";
import { AuthPage } from "./pages/AuthPage";
import { PatientPortal } from "./pages/PatientPortal";
import { DoctorPortal } from "./pages/DoctorPortal";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingHome />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/patient" element={<PatientPortal />} />
        <Route path="/doctor" element={<DoctorPortal />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
