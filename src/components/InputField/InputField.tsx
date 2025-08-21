
import type { IinputField } from "../../types/IinputField";
import { Eye, EyeOff, ShieldX } from "lucide-react";
import styles from "./InputField.module.css"; 
import clsx from "clsx"; 
import { useState } from "react";

function InputField(props: IinputField) {
	const {
		id,
		label,
		Icon,
		placeholder,
		isValid,
		errorMessage,
		type = 'text',
		...rest // Captura todas as outras props de input
	} = props;

	const errorId = `error-${id}`;

	const [showPassword, setShowPassword] = useState(false);
	const isPasswordInput = type === 'password';

	let currentType = type;
	if (!showPassword){
		currentType = 'password';
	} else {
		currentType = 'text';
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
					placeholder={placeholder}
					aria-invalid={!isValid}
					aria-describedby={!isValid ? errorId : undefined}
					{...rest} // Passa todas as props restantes (name, disabled, etc.)
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
				<span id={errorId} role="alert" className="text-red-500 flex ml-8 items-center gap-1 text-xs">
					<ShieldX size={16} />
					<span className={styles.errorMessage}> {errorMessage}</span>
				</span>
			)}
		</div>
	);
}

export default InputField;
