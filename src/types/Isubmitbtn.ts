import type { LucideIcon } from 'lucide-react';
import type { ButtonHTMLAttributes } from 'react';

interface IsubmitBtn extends ButtonHTMLAttributes<HTMLButtonElement> {
	title: string;
	icon?: LucideIcon;
	isLoading?: boolean;
}

export type { IsubmitBtn };