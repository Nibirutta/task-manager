
import { Eye, EyeOff, ShieldX, type LucideIcon } from "lucide-react";
import styles from "./InputField.module.css"; 
import clsx from "clsx"; 
import { useState, type InputHTMLAttributes } from "react";


type InputFieldProps = InputHTMLAttributes<HTMLInputElement> &{
	id: string;
	label: string;
	Icon?: LucideIcon;
	errorMessage?: string;
	isValid?: boolean;
}


const InputField = ({
	id,
	label,
	Icon,
	errorMessage,
	isValid,
	type,
	...rest 
	} : InputFieldProps)  => {



	const [showPassword, setShowPassword] = useState(false);
	const isPasswordInput = type === 'password';

	let currentType = type; 
	if (isPasswordInput) { 
		currentType = showPassword ? 'text' : 'password';
	}

	return (
		<div  className="flex flex-col justify-evenly gap-1 w-full p-2.5 rounded-lg relative" >
			<label
				htmlFor={id}
				className={styles.label}
			>
				{label}
			</label>

			<div
				className={clsx(
					styles.inputContainer,
					!isValid && styles.error
				)}
			>
				{Icon && (
					<Icon className={styles.icon} size={18} />
				)}
				
				<input
					id={id}
					type={currentType}
					className={styles.input}
					aria-invalid={!isValid}
					aria-errormessage={!isValid ? errorMessage : undefined}
					{...rest} 
				/>

				{isPasswordInput && (
					<button
						type="button"
						onClick={() => setShowPassword(!showPassword)}
						className={styles.passwordToggle}
					>
						{showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
					</button>
				)}
			</div>

			{!isValid && errorMessage && (
				<span  role="alert" aria-label="Mensagem de Input Inválido" className="flex ml-8 mt-4 items-center gap-1 text-[var(--input-field-error-color)] text-xs">
					<ShieldX size={24} />
					<span className={styles.errorMessage}> {errorMessage}</span>
				</span>
			)}
		</div>
	);
}

export default InputField;
