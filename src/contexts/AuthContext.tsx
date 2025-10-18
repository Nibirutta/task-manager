import { createContext, useState, type ReactNode, useEffect, useMemo, useCallback } from 'react';

import { requestLogin, requestRefresh, requestLogout, requestDeleteAccount } from '../api/Task API/services/authService';
import type { LoginRequestTypes, UserInfoTypes } from '../types/authServiceTypes';
import { addAuthEventListener } from '../api/Task API/client/authEvent';


type IAuthContext  = {
	isAuthenticated: boolean;
	user: UserInfoTypes | null;
	isLoading: boolean;

	login: (data: LoginRequestTypes) => Promise<void>;
	logout: () => void;
	deleteAccount: () => Promise<void>;
}


// O valor inicial é `undefined` para que possamos verificar se o hook `useAuth`
// está sendo usado dentro do `AuthProvider`.
const AuthContext = createContext<IAuthContext | undefined>(undefined);

//  componente que vai gerenciar todo o estado de autenticação.
function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<UserInfoTypes | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true); 

	const logout = useCallback(async (isForced = false) => {
		// Se não for um logout forçado, tenta fazer o logout no servidor
		if (!isForced) {
			try {
				await requestLogout(); 
			} catch (error) {
				console.error('Erro ao fazer logout no servidor:', error);
			}
		}
		// Limpa o estado local em todos os casos
		setUser(null);
	  }, []);
	

	
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

		// Adiciona um listener para o evento de logout forçado
		const handleForceLogout = () => {
			console.warn("Sessão expirada. Realizando logout forçado.");
			logout(true);
		}
		addAuthEventListener('forceLogout', handleForceLogout);
	}, [logout]);


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

	const deleteAccount = useCallback(async () => {
		try {
			await requestDeleteAccount();
			setUser(null); // Força o logout no frontend
		} catch (error) {
			console.error('Erro ao deletar a conta:', error);
			throw error;
		}
	}, []);

  // o objeto `value` contém tudo que será disponibilizado para os componentes filhos.O useMemo evita recriar o objeto em cada renderização, o que previne re-renderizações desnecessárias nos componentes consumidores.
  const value = useMemo<IAuthContext>(() => ({
    isAuthenticated: !!user,
    user,
    isLoading,
    login,
    logout,
	deleteAccount,
  }), [user, isLoading, login, logout, deleteAccount]);
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export  {AuthProvider, AuthContext, type IAuthContext };
