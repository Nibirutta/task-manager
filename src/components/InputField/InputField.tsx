import { useState } from "react";
import type { IinputField } from "../../types/IinputField";
import { ShieldX } from "lucide-react";

function InputField(props: IinputField) {
	const {
		id,
		value,
		label,
		Icon: Icon,
		placeholder,
		isValid,
		errorMessage,
		onChange,
	} = props;

	const [isFocused, setIsFocused] = useState(false);

	const handleFocus = () => setIsFocused(true);
	const handleBlur = () => setIsFocused(false);

	let borderColor;

	
	if (!isValid) {
		borderColor = "var(--input-field-border-color-error)";
	} else if (isFocused) {
		borderColor = "var(--input-field-border-color-active)";
	} else if (value) {
		borderColor = "var(--input-field-border-color-filled)";
	} else {
		borderColor = "var(--input-field-border-color-default)";
	}

	return (
		<div className="flex gap-3 w-full p-2.5 border border-amber-400 rounded-lg relative" >
			<label
				htmlFor={id}
				className=" bg-[var(--input-field-bg-color)] text-sm text-[var(--input-field-label-color)] absolute  left-2"
			>
				{label}
			</label>

			<div
				className="flex bg-[var(--input-field-bg-color)] w-full rounded-lg border-2 p-2 transition-colors duration-300"
				style={{
					borderColor: borderColor,
					boxShadow: `0 0 4px ${borderColor}`,
				}}
			>
				{Icon && (
					<Icon
						className="text-[var(--input-field-label-color)]"
						size={20}
					/>
				)}
				|
				<input
					id={id}
					type="text"
					className=" text-[var(--input-field-text-color)] outline-none w-full text-lg font-normal placeholder:font-light placeholder:text-[var(--input-field-label-color)] placeholder:text-sm"
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					onBlur={handleBlur}
					onFocus={handleFocus}
				/>
			</div>

			{!isValid && errorMessage && (
				<span className="text-red-500 flex items-center gap-1 text-xs mt-1">
					<ShieldX size={16} />
					{errorMessage}
				</span>
			)}
		</div>
	);
}

export default InputField;
