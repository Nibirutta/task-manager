
import type { IinputField } from "../../types/IinputField";
import { ShieldX } from "lucide-react";
import styles from "./InputField.module.css"; 
import clsx from "clsx"; 

function InputField(props: IinputField) {
	const {
		id,
		value,
		label,
		Icon,
		placeholder,
		isValid,
		errorMessage,
		onChange,
	} = props;

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
					!isValid ? styles.error : value ? styles.filled : styles.default
				)}
			>
				{Icon && (
					<Icon className={styles.icon} size={18} />
				)}
				
				<input
					id={id}
					type="text"
					className={styles.input}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
				/>
			</div>

			{!isValid && errorMessage && (
				
				<span className="text-red-500 flex ml-8 items-center gap-1 text-xs">
					<ShieldX size={16} />
					<span className={styles.errorMessage}> {errorMessage}</span>
				</span>
			)}
		</div>
	);
}

export default InputField;
