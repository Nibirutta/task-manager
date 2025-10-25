import type { CredentialRequestTypes, CredentialResponseTypes, DeleteAccountResponseTypes, LoginRequestTypes, LoginResponseTypes, LogoutResponseTypes, RefreshResponseTypes, RegisterRequestTypes, RegisterResponseTypes, ResetPasswordRequestTypes, ResetPasswordResponseTypes, ResetRequestTypes } from '../../../types/authServiceTypes';
import { credentialRoute, deleteAccountRoute, loginRoute, logoutRoute, refreshRoute, registerRoute, resetPasswordRoute, resetRequestRoute } from '../../../utils/urlApi';
import { apiFetch, setAccessToken } from '../client/apiClient';

const requestRegister = async (data: RegisterRequestTypes ): Promise<RegisterResponseTypes> => {
    const response: RegisterResponseTypes = await apiFetch(registerRoute.route,{
        method: 'POST',
        body: JSON.stringify(data)
    })

	if (response.accessToken) {
		setAccessToken(response.accessToken);
	}

    return response

} 

const requestLogin = async (data: LoginRequestTypes): Promise<LoginResponseTypes> => {
	const response: LoginResponseTypes = await apiFetch(loginRoute.route, {
		method: loginRoute.method,
		body: JSON.stringify(data),
	});

	if (response.accessToken) {
		setAccessToken(response.accessToken);
	}
	
	return response
};

const requestLogout = (): Promise<LogoutResponseTypes> => {
	const response: Promise<LogoutResponseTypes> = apiFetch(logoutRoute.route, {
		method: logoutRoute.method,
	});
	
	return response
}

const requestRefresh = (): Promise<RefreshResponseTypes> => {
	const response: Promise<RefreshResponseTypes> = apiFetch(refreshRoute.route, {
		method: refreshRoute.method,
	});
	
	return response;
}


const requestCredential = (data: CredentialRequestTypes) : Promise<CredentialResponseTypes> => {
	const response: Promise<CredentialResponseTypes> = apiFetch(credentialRoute.route, {
		method: credentialRoute.method,
		body: JSON.stringify(data),
	});
	
	return response
}

const requestPasswordResetEmail = (data: ResetRequestTypes) : Promise<CredentialResponseTypes> => {
	const response : Promise<CredentialResponseTypes> = apiFetch(resetRequestRoute.route,{
		method: resetRequestRoute.method,
		body: JSON.stringify(data)
	})

	return response
}

const requestNewPassword = (data : ResetPasswordRequestTypes, token: string) : Promise<ResetPasswordResponseTypes> => {
	const response : Promise<ResetPasswordResponseTypes> = apiFetch(`${resetPasswordRoute.route}?token=${token}`,{
		method: resetPasswordRoute.method,
		body: JSON.stringify(data)
	})
	
	return response
}

const requestDeleteAccount = () : Promise<DeleteAccountResponseTypes> => {
	const response : Promise<DeleteAccountResponseTypes> = apiFetch(deleteAccountRoute.route,{
		method: deleteAccountRoute.method,
	});

	return response
}




export { requestLogin, requestLogout, requestRefresh, requestRegister, requestCredential,
    requestPasswordResetEmail,
    requestNewPassword,
    requestDeleteAccount }