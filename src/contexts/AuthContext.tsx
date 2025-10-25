import { createContext, useState, type ReactNode, useEffect, useMemo, useCallback } from 'react';

import { requestLogin, requestRefresh, requestLogout, requestDeleteAccount } from '../api/Task API/services/authService';
import type { LoginRequestTypes, UserInfoTypes } from '../types/authServiceTypes';
import { addAuthEventListener } from '../api/Task API/client/authEvent';
import { setAccessToken } from '../api/Task API/client/apiClient';


type IAuthContext  = {
	isAuthenticated: boolean;
	user: UserInfoTypes | null;
	isLoading: boolean;
	login: (data: LoginRequestTypes) => Promise<void>;
	logout: () => void;
	updateUser: (newUserInfo: UserInfoTypes) => void;
	deleteAccount: () => Promise<void>;
}


// O valor inicial é `undefined` para que possamos verificar se o hook `useAuth`
// está sendo usado dentro do `AuthProvider`.
const AuthContext = createContext<IAuthContext | undefined>(undefined);

//  componente que vai gerenciar todo o estado de autenticação.
function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<UserInfoTypes | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true); 

	const logout = useCallback(async () => {
		try {
			// Sempre tenta fazer o logout no servidor, mas não bloqueia o fluxo do frontend se falhar.
			await requestLogout(); 
		} catch (error) {
			console.error('A requisição de logout no servidor falhou, mas o logout local será forçado:', error);
		} finally {
			setUser(null);
			setAccessToken(null); // Limpa o token no apiClient, que é a nossa fonte da verdade
		}
	}, []);
	

	
	// quando carrega tenta renovar a sessão usando o refresh token (cookie HttpOnly)
	useEffect(() => {
		const checkAuthStatus = async () => {
			try {
				const response = await requestRefresh(); 
				setUser(response.userInfo);
				setAccessToken(response.accessToken); // Define o token no apiClient
				
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
			setUser(null); 
			setAccessToken(null);
		}

		// Listener para atualizar o perfil quando o token é renovado em background
		const handleUpdateProfile = (event: Event) => {
			const customEvent = event as CustomEvent<UserInfoTypes>;
			if (customEvent.detail) {
				setUser(customEvent.detail);
			}
		};

		addAuthEventListener('forceLogout', handleForceLogout);
		addAuthEventListener('updateProfile', handleUpdateProfile);
	}, []);


	const login = useCallback(async (data: LoginRequestTypes) => {
		try {
			const response = await requestLogin(data);
			setUser(response.userInfo);
			setAccessToken(response.accessToken); // Define o token no apiClient
			

		} catch (error) {
			console.error('Falha no login:', error);
			setUser(null);
			throw error; // Re-lança o erro para que o formulário de login possa tratá-lo (ex: mostrar toast)

		}
	}, []);

	const deleteAccount = useCallback(async () => {
		try {
			await requestDeleteAccount();
			setUser(null); 
			setAccessToken(null);
		} catch (error) {
			console.error('Erro ao deletar a conta:', error);
			throw error;
		}
	}, []);

	const updateUser = useCallback((newUserInfo: UserInfoTypes) => {
		setUser(newUserInfo);
	}, []);

  // o objeto `value` contém tudo que será disponibilizado para os componentes filhos.O useMemo evita recriar o objeto em cada renderização, o que previne re-renderizações desnecessárias nos componentes consumidores.
  const value = useMemo<IAuthContext>(() => ({
    isAuthenticated: !!user,
    user,
    isLoading,
    login,
    logout,
	updateUser,
	deleteAccount,
  }), [user, isLoading, login, logout, deleteAccount, updateUser]);
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export  {AuthProvider, AuthContext, type IAuthContext };
