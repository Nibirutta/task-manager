import { createContext, useState, type ReactNode, } from 'react';
import sendLoginApi from '../api/taskAPI/requestLogin';
import type { ILoginData } from '../types/TaskApiTypes';
import type { IAuthContext } from '../types/IAuthContext';

// --- Passo 1: Definindo os tipos ---

// Uma boa prática é ter um tipo para o usuário logado.
// Você pode expandir isso com mais dados que sua API retorna.


// Este é o "contrato" do nosso contexto.
// Define tudo que os componentes filhos poderão acessar.


// --- Passo 2: Criando o Contexto ---

// O valor inicial é `undefined` para que possamos verificar se o hook `useAuth`
// está sendo usado dentro do `AuthProvider`.
const AuthContext = createContext<IAuthContext | undefined>(undefined);

// --- Passo 3: Criando o Provedor (Provider) ---

// Este componente vai gerenciar todo o estado de autenticação.
function AuthProvider({ children }: { children: ReactNode }) {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [user, setUser] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	// No futuro, você pode verificar aqui se um token já existe
	// ao carregar a página para manter o usuário logado.
	// useEffect(() => { ... }, []);

	const login = async (data: ILoginData) => {
		setIsLoading(true);
		try {
			// A função `sendLoginApi` deve tratar a chamada à API.

			const accessToken = await sendLoginApi(data);

			// O ideal é que o backend defina um cookie HttpOnly com um refresh token.
			// O accessToken pode ser guardado em memória ou localStorage, se necessário.
			console.log('Login bem-sucedido! Token de acesso:', accessToken);

			setUser(data.username);
			setIsAuthenticated(true);
			// O redirecionamento para o dashboard deve acontecer no componente LoginForm
			// após a chamada bem-sucedida a esta função `login`.
		} catch (error) {
			console.error('Falha no login:', error);
			// Limpamos o estado para garantir consistência.
			setUser(null);
			setIsAuthenticated(false);
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
		setIsAuthenticated(false);

		// O redirecionamento para a página de login acontece no componente que chama o logout.
	};

	// O objeto `value` contém tudo que será disponibilizado para os componentes filhos.
	const value: IAuthContext = {
		isAuthenticated,
		user,
		isLoading,
		login,
		logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export  {AuthProvider, AuthContext};



