import { useContext } from "react";
import { PreferencesContext } from "../contexts/PreferencesContext";

/**
 * Hook customizado para acessar o contexto de preferências do usuário.
 * Garante que o contexto seja consumido apenas dentro de um PreferencesProvider.
 */
const usePreferences = () => {
  const context = useContext(PreferencesContext);

  if (context === undefined) {
    throw new Error("usePreferences deve ser usado dentro de um PreferencesProvider");
  }

  return context;
};

export default usePreferences;
