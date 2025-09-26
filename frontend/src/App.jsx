import { Route, Routes } from "react-router-dom";
import CryptoMonitoringDashboard from "./pages/CrypoMonitoringDashboard";
import Signup from "./pages/SignupPage";
import Login from "./pages/Login";

const App = () => {
  return (
    <div className="min-h-screen ">
      
      <Routes>
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/" element={<CryptoMonitoringDashboard/>} />
      </Routes>
    </div>
  );
};

export default App;
