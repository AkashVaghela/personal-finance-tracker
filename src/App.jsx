import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import AddTransaction from "./pages/AddTransaction";
import Analysis from "./pages/Analysis";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <Routes>
      {/* <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/transactions/add" element={<AddTransaction />} />
      <Route path="/analysis" element={<Analysis />} /> */}
      <Route path="/analytics" element={<Analytics />} />
    </Routes>
  );
}

export default App;
