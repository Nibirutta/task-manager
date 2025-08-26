import type { ILoginData } from "./TaskApiTypes";

interface IAuthContext {
	isAuthenticated: boolean;
	user: string | null;
	isLoading: boolean;
	login: (data: ILoginData) => Promise<void>;
	logout: () => void;
}

export type { IAuthContext }
