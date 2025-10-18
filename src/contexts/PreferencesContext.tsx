import {
  createContext,
  useState,
  type ReactNode,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import useAuth from "../hooks/useAuth";
import type {
  PreferencesTypes,
  themeType,
  languageType,
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
  theme: "light",
  language: "pt-BR",
  notification: {
    email: true,
  },
};

const PreferencesContext = createContext<IPreferencesContext | undefined>(
  undefined
);

function PreferencesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<PreferencesTypes | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Inicializa ou reseta as preferências quando o usuário muda (login/logout)
  useEffect(() => {
    if (user?.preferences) {
      setPreferences(user.preferences);
    } else {
      // Se não há usuário, usa as preferências padrão
      setPreferences(defaultPreferences);
    }
  }, [user]);

  // Efeito para aplicar o tema no <body>
  useEffect(() => {
    const currentTheme = preferences?.theme || defaultPreferences.theme;
    document.body.setAttribute("data-theme", currentTheme);

  }, [preferences?.theme]);

  // Função genérica para atualizações otimistas
  const optimisticUpdate = useCallback(
    async (
        
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      updateFn: () => Promise<any>,
      newPreferences: Partial<PreferencesTypes>
    ) => {
      if (!preferences) return;

      const oldPreferences = { ...preferences };
      const updatedPreferences = { ...preferences, ...newPreferences };

      // 1. Atualização Otimista: muda a UI imediatamente
      setPreferences(updatedPreferences);
      setIsUpdating(true);

      try {
        // 2. Chamada à API
        const response = await updateFn();
        // Sincroniza o estado com a resposta final da API (garantia de consistência)
        setPreferences(response.preferences);
      } catch (error) {
        console.error("Falha ao atualizar preferência:", error);
        // 3. Reversão em caso de erro
        setPreferences(oldPreferences);
        // Opcional: mostrar uma notificação de erro para o usuário
      } finally {
        setIsUpdating(false);
      }
    },
    [preferences]
  );

  const updateTheme = useCallback(
    async (newTheme: themeType) => {
      await optimisticUpdate(() => requestUpdateProfileTheme({ theme: newTheme }), {
        theme: newTheme,
      });
    },
    [optimisticUpdate]
  );

  const updateLanguage = useCallback(
    async (newLanguage: languageType) => {
      await optimisticUpdate(
        () => requestUpdateProfileLanguage({ language: newLanguage }),
        { language: newLanguage }
      );
    },
    [optimisticUpdate]
  );

  const updateEmailNotification = useCallback(
    async (activate: boolean) => {
      await optimisticUpdate(
        () =>
          requestUpdateProfileNotification({
            notificationType: "email",
            activate,
          }),
        { notification: { email: activate } }
      );
    },
    [optimisticUpdate]
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
