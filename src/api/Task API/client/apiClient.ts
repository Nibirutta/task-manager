/* eslint-disable @typescript-eslint/no-explicit-any */

import type { APIErrorType } from "../APITypes";
import { requestRefresh } from "../services/accountService";
import { dispatchAuthEvent } from "./authEvent";

// Variável no escopo do módulo para armazenar o token de acesso em memória.
let accessToken: string | null = null;

// Flag para evitar múltiplas chamadas de refresh simultâneas
let isRefreshing = false;
// Fila para armazenar requisições que falharam enquanto o token estava sendo renovado
let failedQueue: Array<{ resolve: (value: unknown) => void, reject: (reason?: any) => void }> = [];

const processQueue = (error: any) => {
	failedQueue.forEach(prom => {
		if (error) {
			prom.reject(error);
		} else {
			// Apenas resolve a promessa, o callback se encarregará de refazer a chamada.
			prom.resolve(true);
		}
	});

	failedQueue = [];
};

/**
 * Define o token de acesso para ser usado nas requisições.
 * Chamado pelo AuthContext sempre que o token é atualizado (login, refresh).
 */
export const setAccessToken = (token: string | null) => {
	accessToken = token;
};

const apiFetch = async (endpoint: string, options: RequestInit = {}): Promise<any> => {

	const headers = new Headers(options.headers || {});

	if (accessToken) {
		headers.append('Authorization', `Bearer ${accessToken}`);		
	}


	if (options.body) {
		headers.append('Content-Type', 'application/json');
	}
	headers.append('Accept', 'application/json');



	const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}${endpoint}`, {

		credentials: 'include', 
		...options,
		headers,
	});

	// Se a resposta for 403 (Access Token inválido) ou 401 (Não autorizado, mas não da rota de refresh)
	// tenta renovar o token. A rota de refresh retorna 401 quando o Session Token é inválido.
	const isUnauthorized = response.status === 401;
	const isForbidden = response.status === 403;
	if ((isUnauthorized || isForbidden) && endpoint !== '/account/refresh') {
		// Se já existe um refresh em andamento, adiciona a requisição atual na fila de espera.
		if (!isRefreshing) {
			isRefreshing = true;
			try {
				console.log('Token de acesso expirado. Tentando renovar...');
				const refreshResponse = await requestRefresh();
				setAccessToken(refreshResponse.accessToken); // Armazena o novo token
				console.log('Token renovado com sucesso. Tentando a requisição original novamente...', refreshResponse);
				dispatchAuthEvent('updateProfile', { detail: refreshResponse.profile });
				
				// Processa a fila, sinalizando que o refresh foi bem-sucedido.
				processQueue(null);

				// Tenta a requisição original novamente. O navegador enviará o novo cookie.
				return apiFetch(endpoint, options);
			} catch (refreshError) {
				console.error(
					'Falha ao renovar o token. A sessão expirou.',
					// Adiciona mais detalhes ao log para facilitar o debug
					refreshError
				);
				// Processa a fila com erro, rejeitando todas as promessas pendentes
				processQueue(refreshError);
				// Dispara um evento para forçar o logout global
				dispatchAuthEvent('forceLogout');
				// Rejeita a promessa com o erro original de refresh
				return Promise.reject(refreshError);
			} finally {
				isRefreshing = false;
			}
		} else {
			// Se um refresh já está em andamento, retorna uma nova promessa que será resolvida
			// ou rejeitada quando o refresh terminar.
			return new Promise((resolve, reject) => {
				failedQueue.push({
					resolve, reject
				});
			}).then(() => {
				// Quando a promessa da fila for resolvida, refaz a chamada original.
				return apiFetch(endpoint, options);
			});
		}
	}

	if (!response.ok) {
		let errorData: APIErrorType;
		try {
			// Tenta parsear o corpo do erro como JSON
			errorData = await response.json();
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (e) {
			// Se falhar (ex: erro de rede, ou resposta sem corpo), cria um erro padrão
			errorData = {
				message: response.statusText || 'Erro de comunicação com a API.',
				statusCode: response.status,
				error: 'Network Error'
			};
		}

		// Cria um objeto de erro mais informativo
		const error = new Error(errorData.message || 'Ocorreu um erro desconhecido na API.');
		// Anexa as informações extras ao erro
		throw Object.assign(error, { 
			statusCode: errorData.statusCode,
			errorDetails: errorData 
		});
	}

	// Se a resposta for 204 (No Content) ou se o corpo estiver vazio, retorna undefined.
	const contentLength = response.headers.get('content-length');
	if (response.status === 204 || contentLength === '0') {
		return undefined;
	}

	return response.json();
}

export { apiFetch };