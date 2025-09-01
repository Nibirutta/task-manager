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



interface IApiError {
	code: string;
	message: string;
}

export type { ILoginResponse, ILoginData, IRefreshResponse, IApiError }
