import type { ILoginData } from "./authServiceTypes";

interface IAuthContext {
	isAuthenticated: boolean;
	user: string | null;
	isLoading: boolean;
	accessToken: string | null;
	login: (data: ILoginData) => Promise<void>;
	logout: () => void;
}

export type { IAuthContext }
