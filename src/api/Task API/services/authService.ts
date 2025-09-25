
import type { ILoginData, ILoginResponse, IRefreshResponse } from '../../../types/authServiceTypes';
import { loginRoute, logoutRoute, refreshRoute } from '../../../utils/urlApi';
import { apiFetch } from '../client/apiClient';

const requestLogin = (loginData: ILoginData): Promise<ILoginResponse> => {
	const response: Promise<ILoginResponse> = apiFetch(loginRoute.route, {
		method: loginRoute.method,
		body: JSON.stringify(loginData),
	});
	
	return response
};

const requestLogout = (): Promise<void> => {
	const response: Promise<void> = apiFetch(logoutRoute.route, {
		method: logoutRoute.method,
	});
	
	return response
}

const requestRefresh = (): Promise<IRefreshResponse> => {
	const response: Promise<IRefreshResponse> = apiFetch(refreshRoute.route, {
		method: refreshRoute.method,
	});
	
	return response
}


export { requestLogin, requestLogout, requestRefresh }