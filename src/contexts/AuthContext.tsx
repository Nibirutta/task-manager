import { createContext, useState, type ReactNode, useEffect, useMemo, useCallback } from 'react';

import { requestLogin, requestRefresh, requestLogout } from '../api/Task API/services/authService';
import type { LoginRequestTypes, UserInfoTypes } from '../types/authServiceTypes';

type IAuthContext  = {
	isAuthenticated: boolean;
	user: UserInfoTypes | null;
	isLoading: boolean;

	login: (data: LoginRequestTypes) => Promise<void>;
	logout: () => void;
}


// O valor inicial é `undefined` para que possamos verificar se o hook `useAuth`
// está sendo usado dentro do `AuthProvider`.
const AuthContext = createContext<IAuthContext | undefined>(undefined);

//  componente que vai gerenciar todo o estado de autenticação.
function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<UserInfoTypes | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true); 

	
	// quando carrega tenta renovar a sessão usando o refresh token (cookie HttpOnly)
	useEffect(() => {
		const checkAuthStatus = async () => {
			try {
				const response = await requestRefresh(); 
				setUser(response.userInfo);
				
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			} catch (error) {
				console.log('Nenhuma sessão ativa encontrada.');
				setUser(null);
			} finally {
				// finaliza o carregamento inicial
				setIsLoading(false);
			}
		};

		checkAuthStatus();
	}, []);


	const login = useCallback(async (data: LoginRequestTypes) => {
    setIsLoading(true);
		try {
			const response = await requestLogin(data);
			setUser(response.userInfo);

		} catch (error) {
			console.error('Falha no login:', error);
			setUser(null);

			throw error;
		} finally {
			// garante que o estado de loading seja desativado, mesmo se der erro.
			setIsLoading(false);
		}
	}, []);

  const logout = useCallback(async () => {
    try {
      await requestLogout(); 
    } catch (error) {
      console.error('Erro ao fazer logout no servidor:', error);
    } finally {
      // limpa o estado localmente, independentemente do sucesso da chamada à API.
      setUser(null);
    }
  }, []);

  // o objeto `value` contém tudo que será disponibilizado para os componentes filhos.O useMemo evita recriar o objeto em cada renderização, o que previne re-renderizações desnecessárias nos componentes consumidores.
  const value = useMemo<IAuthContext>(() => ({
    isAuthenticated: !!user,
    user,
    isLoading,
    login,
    logout,
  }), [user, isLoading, login, logout]);
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export  {AuthProvider, AuthContext, type IAuthContext };
