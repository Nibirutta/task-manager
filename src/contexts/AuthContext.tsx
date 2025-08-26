import { createContext, useState, type ReactNode } from 'react';
import sendLoginApi from '../api/taskAPI/requestLogin';
import type { ILoginData } from '../types/TaskApiTypes';
import type { IAuthContext } from '../types/IAuthContext';



// O valor inicial é `undefined` para que possamos verificar se o hook `useAuth`
// está sendo usado dentro do `AuthProvider`.
const AuthContext = createContext<IAuthContext | undefined>(undefined);

// --- Passo 3: Criando o Provedor (Provider) ---

// Este componente vai gerenciar todo o estado de autenticação.
function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<string | null>(null);
	const [accessToken, setAccessToken] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	// No futuro, você pode verificar aqui se um token já existe
	// ao carregar a página para manter o usuário logado.
	// useEffect(() => { ... }, []);

	const login = async (data: ILoginData) => {
		setIsLoading(true);
		try {
			const currentToken = await sendLoginApi(data);


			/* armazenando o access token em memória */
			setAccessToken(currentToken)
			setUser(data.username);
			// O redirecionamento para o dashboard deve acontecer no componente LoginForm
			// após a chamada bem-sucedida a esta função `login`.
		} catch (error) {
			console.error('Falha no login:', error);
			// Limpamos o estado para garantir consistência.
			setUser(null);
			setAccessToken(null);
			// **MUITO IMPORTANTE**: Relançamos o erro!
			// Isso permite que o componente `LoginForm` que chamou `login`
			// saiba que a operação falhou e possa usar o `setError` do react-hook-form.
			throw error;
		} finally {
			// Garante que o estado de loading seja desativado, mesmo se der erro.
			setIsLoading(false);
		}
	};

	const logout = () => {
		// Aqui você chamaria a API para invalidar o token/sessão no backend.
		// await api.logout();

		// Limpa o estado localmente.
		setUser(null);
		setAccessToken(null);


		// O redirecionamento para a página de login acontece no componente que chama o logout.
	};

	// O objeto `value` contém tudo que será disponibilizado para os componentes filhos.
	const value: IAuthContext = {
		isAuthenticated: accessToken ? true : false,
		user,
		isLoading,
		login,
		logout,
		accessToken,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export  {AuthProvider, AuthContext};



