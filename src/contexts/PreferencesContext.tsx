import {
  type ReactNode,
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

import { requestUpdateAccount } from "../api/Task API/services/accountService";
import { handleApiError } from "../utils/handleApiError";
import i18n from "../layout/i18n"; // 1. Importamos a instância do i18n
import type { languageType, PreferencesTypes, themeType, UpdateAccountResponseTypes } from "../types/AccountServiceTypes";

interface IPreferencesContext {
  preferences: PreferencesTypes | null;
  theme: themeType;
  language: languageType;
  isUpdating: boolean;
  updateTheme: (newTheme: themeType) => Promise<void>;
  updateLanguage: (newLanguage: languageType) => Promise<void>;
  updateEmailNotification: (activate: boolean) => Promise<void>;
}

const defaultPreferences: PreferencesTypes = {
  theme: "default",
  language: i18n.language as languageType,
  notification: {
    notificationType: "email",
    isActivated: true
  },
};

const PreferencesContext = createContext<IPreferencesContext | undefined>(
  undefined
);

function PreferencesProvider({ children }: { children: ReactNode }) {
  const { user, updateUser } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);

  const preferences = user?.preferences ?? defaultPreferences;

  // efeito para aplicar o tema no <body>
  useEffect(() => {
    document.body.dataset.theme = preferences.theme;
  }, [preferences?.theme]);

  // efeito para aplicar o idioma no <html>
  useEffect(() => {
    const currentLanguage = preferences.language;
    document.documentElement.lang = currentLanguage;
    i18n.changeLanguage(currentLanguage);
  }, [preferences?.language]);

  // Função genérica para atualizações
  const handleUpdate = useCallback(
    async (updateFn: () => Promise<UpdateAccountResponseTypes>) => {
      setIsUpdating(true);
      try {
        const response = await toast.promise(updateFn(), {
          pending: "Salvando suas preferências...",
          success: "Preferências salvas com sucesso!",
          error: "Não foi possível salvar suas preferências. Tente novamente.",
        });
        updateUser(response.profile);
      } catch (error) {
        // Usa o handler centralizado para exibir a mensagem de erro da API ou uma padrão.
        handleApiError(error, "Não foi possível salvar sua preferência.");
      } finally {
        setIsUpdating(false);
      }
    },
    [updateUser] 
  );

  const updateTheme = useCallback(
    async (newTheme: themeType) => {
      await handleUpdate(() => requestUpdateAccount({ theme: newTheme }));
    },
    [handleUpdate]
  );

  const updateLanguage = useCallback(
    async (newLanguage: languageType) => {
      await handleUpdate(() => requestUpdateAccount({ language: newLanguage,
      }));
    },
    [handleUpdate]
  );

  const updateEmailNotification = useCallback(
    async (activate: boolean) => {
      const notification = { notificationType: "email" as const, isActivated: activate };
      await handleUpdate(() => requestUpdateAccount({ notification }));
    },
    [handleUpdate]
  );

  const value = useMemo<IPreferencesContext>(
    () => ({
      preferences,
      theme: preferences?.theme || defaultPreferences.theme,
      language: preferences?.language || defaultPreferences.language,
      isUpdating,
      updateTheme,
      updateLanguage,
      updateEmailNotification,
    }),
    [preferences, isUpdating, updateTheme, updateLanguage, updateEmailNotification] 
  );

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}

export { PreferencesProvider, PreferencesContext };
