import { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { ILoginData } from '../types/TaskApiTypes';
import sendLoginApi from '../api/taskAPI/login';
import type { IAuthContext } from '../types/IAuthContext';

// Cria o contexto com um valor padrão
const AuthContext = createContext<IAuthContext | undefined>(undefined);

// O Provedor do Contexto: um componente que vai envolver nossa aplicação
export function AuthProvider({ children }: { children: ReactNode }) {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

	// No futuro, você pode verificar aqui se um cookie de sessão já existe
	// ao carregar a página para manter o usuário logado.
	// useEffect(() => { ... }, []);

	const login = async (data: ILoginData) => {
		// A função sendLoginApi já trata os erros da API e os lança.
		// O token retornado pode ser usado para outras coisas, mas o principal
		// (um refresh token) deve ser definido como um cookie HttpOnly pelo seu backend.
		await sendLoginApi(data);
		setIsAuthenticated(true);
		// todo função de redirecionamento para dashboard
	};

	const logout = () => {
		// todo função de logout da api
		setIsAuthenticated(false);
		// todo função de redirecionamento para página de login
	};

	const value = { isAuthenticated, login, logout };

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;


