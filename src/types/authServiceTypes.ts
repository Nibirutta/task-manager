interface ILoginData {
    username: string,
    password: string
}

interface ILoginResponse {
	message: string;
	accessToken: string;
}

interface IRefreshResponse {
	accessToken: string;
}

interface IRegisterData { 
	username: string;
	password: string;
	email: string;
	firstname: string;
	lastname?: string;
}

interface IRegisterResponse {
	message: string;
	code: string;
}

interface IApiError {
	code: string;
	message: string;
}

export type { ILoginResponse, ILoginData, IRefreshResponse, IRegisterData, IRegisterResponse, IApiError }
