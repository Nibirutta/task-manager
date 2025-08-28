
import type { ILoginData, ILoginResponse } from '../../../types/TaskApiTypes';
import { loginRoute } from '../../../utils/urlApi';
import { apiFetch } from '../client/apiClient';

const requestLogin = (loginData: ILoginData): Promise<ILoginResponse> => {
	const response: Promise<ILoginResponse> = apiFetch(loginRoute.route, {
		method: loginRoute.method,
		body: JSON.stringify(loginData),
	});
	
	return response
};

export { requestLogin }