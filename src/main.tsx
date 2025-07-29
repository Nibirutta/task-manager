import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import InputField from "./components/InputField/InputField";
import { Mail } from "lucide-react";
// import App from './App.tsx'

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		{/* <App /> */}
		<InputField
			id="email"
			label="Email"
			value=""
			onChange={() => {}}
			placeholder="Enter your email"
			isValid={true}
			errorMessage="Email is not valid"
			Icon={Mail}
		/>
	</StrictMode>
);
