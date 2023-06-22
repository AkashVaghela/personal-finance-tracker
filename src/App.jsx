import { useEffect, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";

function App() {
  const navigate = useNavigate();
  const { state } = useContext(AuthContext);

  useEffect(() => {
    const { user } = state;

    if (user?.uid) {
      navigate("/dashboard");
    } else {
      navigate("/signup");
    }
  }, [state]);

  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
