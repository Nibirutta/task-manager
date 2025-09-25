import RegisterForm from '../features/RegisterForm/RegisterForm';
import { useEffect } from 'react';

const RegisterPage = () => {
  useEffect(() => {
    document.title = "Task Manager | Registrar";
  }, []);

  return (
    <div className="w-full py-64 flex justify-center content-center">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
