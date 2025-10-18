import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

import { AuthProvider } from "./contexts/AuthContext";

import App from "./App";
import { PreferencesProvider } from "./contexts/PreferencesContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PreferencesProvider>
          <App />
        </PreferencesProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
