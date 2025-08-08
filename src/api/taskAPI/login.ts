import type { IApiError, ILoginData, ILoginResponse } from "../../types/TaskApiTypes";
import url from "../../utils/urlApi";

const endpoint = `${url}/user/login`;

const sendLogin = async (loginData: ILoginData): Promise<ILoginResponse> => {
	const requestOptions: RequestInit = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(loginData),
	};

	try {
		const response = await fetch(endpoint, requestOptions);
		if (!response.ok) {
			// a API retorna um JSON com 'code' e 'message' em caso de erro.
			const errorData: IApiError = await response.json();
			const error = new Error(
				errorData.message || "Falha no login. Verifique suas credenciais."
                + errorData.code || "403"
			);

			throw error;
		}

		/* se for bem sucedida a resposta vai ser o token de autorização */
		const data: ILoginResponse = await response.json();
		return data;
	} catch (error) {
		console.error("Houve um erro ao enviar os dados de login:", error);
		throw error;
	}
};

export default sendLogin;