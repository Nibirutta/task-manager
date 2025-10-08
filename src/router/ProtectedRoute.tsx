import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Spinner from '../components/Spinner/Spinner';

/**
 * Componente para proteger rotas que exigem autenticação.
 * 
 * - Se o estado de autenticação ainda está carregando, exibe um SPinner Loader.
 * - Se o usuário não está autenticado, redireciona para a página de login.
 * - Se o usuário está autenticado, renderiza o componente da rota filha através do <Outlet />.
 */
const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Spinner size={55} color="#0d1b2a" text="Verificando sua sessão..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
