import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import type { IAuthContext } from "../types/IAuthContext";

/**
 * Hook customizado para acessar o contexto de autenticação.
 * Garante que o contexto seja consumido apenas dentro de um AuthProvider.
 */
const useAuth = (): IAuthContext => {

	const context = useContext(AuthContext); 

	// Se um componente tentar usar o `useAuth` fora do `AuthProvider`,
	// ele receberá um erro claro, o que evita muitos bugs.
	if (context === undefined) {
		throw new Error('useAuth deve ser usado dentro de um AuthProvider');
	}

	return context; 
};


export default useAuth;