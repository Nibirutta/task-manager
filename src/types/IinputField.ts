import type { ElementType, InputHTMLAttributes } from "react";

interface IinputField extends InputHTMLAttributes<HTMLInputElement> {
	id: string;
	label: string;
	Icon?: ElementType;
	errorMessage?: string;
	isValid?: boolean;
}

export type { IinputField }