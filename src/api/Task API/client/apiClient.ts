/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseURL } from "../../../utils/urlApi";
import type { APIErrorType } from "../APITypes";
import { requestRefresh } from "../services/authService";
import { dispatchAuthEvent } from "./authEvent";



// Flag para evitar múltiplas chamadas de refresh simultâneas
let isRefreshing = false;
// Fila para armazenar requisições que falharam enquanto o token estava sendo renovado
let failedQueue: Array<{ resolve: (value: unknown) => void, reject: (reason?: any) => void }> = [];

const processQueue = (error: any, token: any = null) => {
	failedQueue.forEach(prom => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(token);
		}
	});

	failedQueue = [];
};

const apiFetch = async (endpoint: string, options: RequestInit = {}) => {

	const headers = new Headers(options.headers || {});

	// Garante que estamos sempre enviando e aceitando JSON
	if (options.body) {
		headers.append('Content-Type', 'application/json');
	}
	headers.append('Accept', 'application/json');

	const response = await fetch(`${baseURL}${endpoint}`, {
		...options,
		credentials: 'include', // Essencial para enviar cookies HttpOnly
		headers,
	});

	// Se a resposta for 401 (Unauthorized), tenta renovar o token
	if (response.status === 401 && endpoint !== '/account/refresh') {
		// Se já existe um refresh em andamento, adiciona a requisição atual na fila de espera.
		if (!isRefreshing) {
			isRefreshing = true;
			try {
				console.log('Token de acesso expirado. Tentando renovar...');
				const refreshResponse = await requestRefresh();
				console.log('Token renovado com sucesso. Tentando a requisição original novamente...');
				
				// Processa a fila com o novo token (que já está no cookie)
				processQueue(null, refreshResponse);

				// Tenta a requisição original novamente com o novo token (que já está no cookie)
				return apiFetch(endpoint, options);
			} catch (refreshError) {
				console.error('Falha ao renovar o token. A sessão expirou.');
				// Processa a fila com erro, rejeitando todas as promessas pendentes
				processQueue(refreshError, null);
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
					resolve: () => {
						// Tenta a requisição original novamente
						resolve(apiFetch(endpoint, options));
					}, reject
				});
			});
		}
	}

	if (!response.ok) {
		const errorData: APIErrorType = await response.json().catch(() => ({
			message: `Erro na API: ${response.statusText}`,
			statusCode: response.status,
		}));
		// Lança um erro mais estruturado
		throw Object.assign(new Error(errorData.message || 'Ocorreu um erro desconhecido na API.'), { statusCode: errorData.statusCode });
	}

	// Se a resposta for 204 (No Content) não precisa converter nadinha.
	if (response.status === 204) {
		return;
	}

	return response.json();
}

export { apiFetch } 