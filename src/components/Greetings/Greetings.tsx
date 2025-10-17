import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import style from './Greeting.module.css';
import { toast } from 'react-toastify';


function Greetings() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.info('Você será redirecionado para a página de login.')
    logout();
    navigate('/login');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center gap-4">
      <h2 className={style.text}>
        Olá, {user.name}!
      </h2>
      <button onClick={handleLogout} className="p-4  text-[var(--navbar-link-color)] rounded-md cursor-pointer  text-2xl font-medium transition-colors  hover:text-[var(--navbar-link-hover)]">
        Não é você? Sair
      </button>
    </div>
  );
}

export default Greetings;
