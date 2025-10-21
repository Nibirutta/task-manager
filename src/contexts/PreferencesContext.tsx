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
import type {
  PreferencesTypes,
  themeType,
  languageType,
  UserInfoTypes,
} from "../types/authServiceTypes";

import {
  requestUpdateProfileLanguage,
  requestUpdateProfileTheme,
  requestUpdateProfileNotification,
} from "../api/Task API/services/profileService";

interface IPreferencesContext {
  preferences: PreferencesTypes | null;
  theme: themeType;
  isUpdating: boolean;
  updateTheme: (newTheme: themeType) => Promise<void>;
  updateLanguage: (newLanguage: languageType) => Promise<void>;
  updateEmailNotification: (activate: boolean) => Promise<void>;
}

const defaultPreferences: PreferencesTypes = {
  theme: "dark",
  language: "pt-BR",
  notification: {
    email: true,
  },
};

const PreferencesContext = createContext<IPreferencesContext | undefined>(
  undefined
);

function PreferencesProvider({ children }: { children: ReactNode }) {
  const { user, updateUser } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);

  const preferences = user?.preferences ?? defaultPreferences;

  // Efeito para aplicar o tema no <body>
  useEffect(() => {
    document.body.dataset.theme = preferences.theme;
  }, [preferences?.theme]);

  // Efeito para aplicar o idioma no <html>
  useEffect(() => {
    document.documentElement.lang = preferences.language;
  }, [preferences?.language]);

  // Função genérica para atualizações
  const handleUpdate = useCallback(
    async (updateFn: () => Promise<UserInfoTypes>) => {
      setIsUpdating(true);
      try {
        const updatedUser = await updateFn();
        // Atualiza o estado global no AuthContext
        updateUser(updatedUser);
        toast.success("Preferência atualizada!");
      } catch (error) {
        console.error("Falha ao atualizar preferência:", error);
        // Reverte a UI para o estado original (já que o 'user' não foi atualizado)
        // e notifica o usuário.
        toast.error("Não foi possível salvar sua preferência.");
      } finally {
        setIsUpdating(false);
      }
    },
    [updateUser] 
  );

  const updateTheme = useCallback(
    async (newTheme: themeType) => {
      await handleUpdate(() => requestUpdateProfileTheme({ theme: newTheme }));
    },
    [handleUpdate]
  );

  const updateLanguage = useCallback(
    async (newLanguage: languageType) => {
      await handleUpdate(() => requestUpdateProfileLanguage({ language: newLanguage }));
    },
    [handleUpdate]
  );

  const updateEmailNotification = useCallback(
    async (activate: boolean) => {
      await handleUpdate(() =>
        requestUpdateProfileNotification({
          notificationType: "email",
          activate,
        })
      );
    },
    [handleUpdate]
  );

  const value = useMemo<IPreferencesContext>(
    () => ({
      preferences,
      theme: preferences?.theme || defaultPreferences.theme,
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
