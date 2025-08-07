import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, Send } from 'lucide-react';
import style from './LoginForm.module.css'
import InputField from '../../components/InputField/InputField';
import SubmitBtn from '../../components/SubmitBtn/SubmitBtn';
import idGenerator from '../../utils/idGenerator';

const loginSchema = z.object({
  email: z.string().email({ message: 'Por favor, insira um e-mail válido.' }),
  password: z.string().min(8, { message: 'A senha deve ter pelo menos 8 caracteres.' }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

function LoginForm() {
 
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid: isFormValid },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched', 
  });

  
  const onSubmit = async (data: LoginFormInputs) => {
    console.log('Enviando dados para a API:', data);
    // Simula uma chamada de API
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Dados enviados com sucesso!');
  };

  return (
	  <form 
      onSubmit={handleSubmit(onSubmit)} 
      className={style.form}
	  >
      <h2 className={style.title}>Login</h2>
		
      
      <InputField
        id={idGenerator()}
        label="E-mail"
        placeholder="seuemail@exemplo.com"
        Icon={Mail}
        {...register('email')}
        isValid={!errors.email}
        errorMessage={errors.email?.message}
      />

      <InputField
        id={idGenerator()}
        label="Senha"
        type="password" 
        placeholder="••••••••"
        Icon={Lock}
        {...register('password')}
        isValid={!errors.password}
        errorMessage={errors.password?.message}
      />

      <SubmitBtn
        title="Entrar"
        icon={Send}
        isLoading={isSubmitting}
        disabled={!isFormValid || isSubmitting}
      />

	  <div className={style.redirect}>
		<a href="http://" target="_blank" rel="noopener noreferrer">
			<span>Não tem uma conta</span>
		</a>

		<a href="http://" target="_blank" rel="noopener noreferrer">
			<span>Esqueceu sua senha?</span>
		</a>
	  </div>

    </form>

  );
}

export default LoginForm;
