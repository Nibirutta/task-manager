import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import LoginForm from "./features/LoginForm/LoginForm";
import { AuthProvider } from "./contexts/AuthContext";

import App from "./App";
// import Registerform from "./features/RegisterForm/RegisterForm";

// import App from './App.tsx'

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AuthProvider>
			<App/>
		</AuthProvider>
	</StrictMode>
);
