import { createContext, useState, type ReactNode, useEffect, useMemo, useCallback } from 'react';
import type { ILoginData } from '../types/TaskApiTypes';
import type { IAuthContext } from '../types/IAuthContext';
import { requestLogin, requestRefresh, requestLogout } from '../api/Task API/services/authService';



// O valor inicial é `undefined` para que possamos verificar se o hook `useAuth`
// está sendo usado dentro do `AuthProvider`.
const AuthContext = createContext<IAuthContext | undefined>(undefined);

//  Criando o Provedor (Provider) ---

// Este componente vai gerenciar todo o estado de autenticação.
function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<string | null>(null);
	const [accessToken, setAccessToken] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true); 

	// Ao carregar a aplicação, tenta renovar a sessão usando o refresh token (cookie HttpOnly)
	useEffect(() => {
		const checkAuthStatus = async () => {
			try {
				const response = await requestRefresh(); // Tenta obter um novo access token
				setAccessToken(response.accessToken);
				// A API de refresh precisa retornar os dados do usuário para popularmos o estado.
			} catch (error) {
				// Se falhar, significa que não há sessão válida. Não fazemos nada.
				console.log('Nenhuma sessão ativa encontrada.', error);
				setUser(null);
				setAccessToken(null);
			} finally {
				// Finaliza o carregamento inicial, permitindo a renderização
				setIsLoading(false);
			}
		};

		checkAuthStatus();
	}, []);


	const login = useCallback(async (data: ILoginData) => {
    setIsLoading(true);
		try {
			const response = await requestLogin(data);
			
			/* armazenando o access token em memória */
			setAccessToken(response.accessToken)
			setUser(data.username);
			// O redirecionamento para o dashboard deve acontecer no componente LoginForm
			// após a chamada bem-sucedida a esta função `login`.
		} catch (error) {
			console.error('Falha no login:', error);
			// Limpamos o estado para garantir consistência.
			setUser(null);
			setAccessToken(null);
			/* !! Relançamos o erro! */
			// Isso permite que o componente `LoginForm` que chamou `login`
			// saiba que a operação falhou e possa usar o `setError` do react-hook-form.
			throw error;
		} finally {
			// Garante que o estado de loading seja desativado, mesmo se der erro.
			setIsLoading(false);
		}
	}, []);

  const logout = useCallback(async () => {
    try {
      await requestLogout(); // Chama a API para invalidar a sessão no backend e limpar o cookie
    } catch (error) {
      console.error('Erro ao fazer logout no servidor:', error);
    } finally {
      // Limpa o estado localmente, independentemente do sucesso da chamada à API.
      setUser(null);
      setAccessToken(null);
    }
  }, []);

  // O objeto `value` contém tudo que será disponibilizado para os componentes filhos.
  // Usamos useMemo para evitar recriar o objeto em cada renderização,
  // o que previne re-renderizações desnecessárias nos componentes consumidores.
  const value = useMemo<IAuthContext>(() => ({
    isAuthenticated: !!accessToken,
    user,
    isLoading,
    login,
    logout,
    accessToken,
  }), [accessToken, user, isLoading, login, logout]);
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export  {AuthProvider, AuthContext};
