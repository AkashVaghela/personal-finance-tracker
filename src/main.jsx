import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider, { AuthContext } from "./context/AuthContext";
import TransactionsContextProvider, {
  TransactionsContext,
} from "./context/TransactionsContext";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContextProvider value={AuthContext}>
      <TransactionsContextProvider value={TransactionsContext}>
        <App />
      </TransactionsContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
