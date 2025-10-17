
import { baseURL } from "../../../utils/urlApi";
import type { APIErrorType } from "../APITypes";



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

	if (!response.ok) {
		const errorData: APIErrorType = await response.json().catch(() => ({
			message: `Erro na API: ${response.statusText}`,
			code: response.status,
		}));
		throw new Error(errorData.message || 'Ocorreu um erro desconhecido na API.');
	}

	// Se a resposta for 204 (No Content) não precisa converter nadinha.
	if (response.status === 204) {
		return;
	}

	return response.json();
}

export { apiFetch } 