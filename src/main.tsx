import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import LoginForm from "./features/LoginForm/LoginForm";

// import App from './App.tsx'

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		{/* <App /> */}
		< LoginForm /> 
	</StrictMode>
);
