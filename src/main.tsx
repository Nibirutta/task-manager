import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import LoginForm from "./features/LoginForm/LoginForm";
import { AuthProvider } from "./contexts/AuthContext";
import DevCard from "./components/DevCard/DevCard";
// import Registerform from "./features/RegisterForm/RegisterForm";

// import App from './App.tsx'

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AuthProvider>
			{/* <App /> */}
			< DevCard 
				name="Alucinado-dev"
				avatar="/src/assets/imgs/avatar/20250123_165309.jpg"
				linkedin=""
				github=""
				portfolio=""
				portfolioImage="/src/assets/favicon/ALucin4do-logo.png"
				color1="#FF00FF"
				color2="#00FFFF"
			/>
		</AuthProvider>
	</StrictMode>
);
