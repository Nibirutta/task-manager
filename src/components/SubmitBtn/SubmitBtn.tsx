import clsx from 'clsx';
import type { IsubmitBtn } from '../../types/Isubmitbtn';
import style from './SubmitBtn.module.css';
import { LoaderCircle } from 'lucide-react';

function SubmitBtn(props: IsubmitBtn) {
	const { title, icon: Icon, isLoading, className, disabled, ...rest } = props;

	const isDisabled = isLoading || disabled;

	return (
		<button
			className={clsx(style.btn, className, isDisabled && style.disabled)}
			type="submit"
			disabled={isDisabled}
			aria-disabled={isDisabled}
			{...rest}
		>
			{isLoading ? (
				<LoaderCircle className={style.spinner} size={20} />
			) : (
				Icon && <Icon size={20} />
			)}
			<span className={style.text}> 
				{isLoading ? 'Enviando...' : title}
			</span>
		</button>
	);
}

export default SubmitBtn; 