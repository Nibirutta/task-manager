import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { I18nextProvider } from "react-i18next";
import i18n from "./layout/i18n";
import { AuthProvider } from "./contexts/AuthContext";

import App from "./App";
import { PreferencesProvider } from "./contexts/PreferencesContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PreferencesProvider>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
        </PreferencesProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
