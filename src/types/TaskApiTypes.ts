interface ILoginData {
    username: string,
    password: string
}

interface ILoginResponse {
	token: string;
}


interface IApiError {
	code: string;
	message: string;
}

export type { ILoginResponse, ILoginData, IApiError }
