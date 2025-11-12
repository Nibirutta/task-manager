import { useContext } from "react";
import { AuthContext, type IAuthContext } from "../contexts/AuthContext";


/**
 * Hook customizado para acessar o contexto de autenticação.
 * Garante que o contexto seja consumido apenas dentro de um AuthProvider.
 */
const useAuth = (): IAuthContext => {

	const context = useContext(AuthContext); 

	if (context === undefined) {
		throw new Error('useAuth deve ser usado dentro de um AuthProvider');
	}

	return context; 
};


export default useAuth;