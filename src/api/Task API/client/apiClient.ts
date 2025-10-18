
import { baseURL } from "../../../utils/urlApi";
import type { APIErrorType } from "../APITypes";
import { requestRefresh } from "../services/authService";
import { dispatchAuthEvent } from "./authEvent";



let isRefreshing = false;


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
		if (!isRefreshing) {
			isRefreshing = true;
			try {
				console.log('Token de acesso expirado. Tentando renovar...');
				await requestRefresh();
				console.log('Token renovado com sucesso. Tentando a requisição original novamente...');
				// Tenta a requisição original novamente com o novo token (que já está no cookie)
				return apiFetch(endpoint, options);
			} catch (refreshError) {
				console.error('Falha ao renovar o token. A sessão expirou.');
				// Dispara um evento para forçar o logout global
				dispatchAuthEvent('forceLogout');
				// Rejeita a promessa com o erro original de refresh
				return Promise.reject(refreshError);
			} finally {
				isRefreshing = false;
			}
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