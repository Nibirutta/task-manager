import clsx from 'clsx';

import style from './SubmitBtn.module.css';
import { LoaderCircle, type LucideIcon } from 'lucide-react';
import type { ButtonHTMLAttributes } from 'react';

type SubmitBtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	title: string;
	icon?: LucideIcon;
	isLoading?: boolean;
}

function SubmitBtn({
	title,
	icon: Icon,
	isLoading,
	...rest
}: SubmitBtnProps) {

	const isDisabled = isLoading || rest.disabled

	return (
		<button
			className={clsx(style.btn, rest.className, isDisabled && style.disabled)}
			type="submit"
			disabled={isDisabled}
			aria-disabled={isDisabled}
			{...rest}
		>
			{isLoading ? (
				<LoaderCircle className={style.spinner} size={28} />
			) : (
				Icon && <Icon size={28}  />
			)}
			<span> 
				{isLoading ? 'Enviando...' : title}
			</span>
		</button>
	);
}

export default SubmitBtn; 