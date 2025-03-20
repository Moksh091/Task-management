import { BrowserRouter, Route, Routes } from "react-router";
import LandingPage from "./routes/LandingPage";
import LoginPage from "./routes/Login";
import Dashboard from "./routes/Dashboard";
function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
