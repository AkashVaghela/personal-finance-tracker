import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider, { AuthContext } from "./context/AuthContext";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider value={AuthContext}>
        <App />
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
