import type {
	ElementType,
	InputHTMLAttributes,
} from "react";

export interface IInputField
	extends InputHTMLAttributes<HTMLInputElement> {
	id: string;
	label: string;
	// value, onChange, placeholder, type, etc., são herdados de InputHTMLAttributes
	isValid: boolean;
	errorMessage?: string;
	icon: ElementType;
}
