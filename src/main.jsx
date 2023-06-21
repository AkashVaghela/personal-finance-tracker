import React from "react";
import ReactDOM from "react-dom/client";
import AuthContextProvider, { AuthContext } from "./context/AuthContext";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider value={AuthContext}>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
