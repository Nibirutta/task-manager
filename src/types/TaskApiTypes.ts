interface ILoginData {
    username: string,
    password: string
}

interface ILoginResponse {
	message: string;
	acessToken: string;
}


interface IApiError {
	code: string;
	message: string;
}

export type { ILoginResponse, ILoginData, IApiError }
