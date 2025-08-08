import type { ILoginData } from "./TaskApiTypes";

interface IAuthContext {
    isAuthenticated: boolean;
    login: (data: ILoginData) => Promise<void>;
    logout: () => void;
}

export type { IAuthContext }