import Spinner from "../../components/Spinner/Spinner";
import usePreferences from "../../hooks/usePreferences";
import { Label } from "../../lib/Reui/label/label";
import type { languageType, themeType } from "../../types/authServiceTypes";
import { ToggleSwitch } from "flowbite-react";

export function PreferencesSection() {
  const {
    preferences,
    theme,
    isUpdating,
    updateTheme,
    updateLanguage,
    updateEmailNotification,
  } = usePreferences();

  const availableThemes: themeType[] = ["default", "solar-bloom", "neon-flow", "forest-calm", "cloudy-focus", "after-hours"];

  const availableLanguages: languageType[] = ["pt-BR", "en-US"];

  if (!preferences) {
    return <Spinner size={32} />;
  }

  return (
    <section className="w-full py-20 flex flex-col items-center justify-center gap-8">
      <div>
        <h3 className="text-5xl font-bold font-(family-name:--profile-title-font) text-[var(--profile-title-color)] text-shadow-[var(--profile-title-shadow)]">
          Preferências da Aplicação
        </h3>
        <p className="text-2xl mt-12 font-medium font-(family-name:--profile-subtitle-font) text-[var(--profile-subtitle-color)]">
          Personalize a aparência e o comportamento do aplicativo.
        </p>
      </div>

      <div className="p-12 flex flex-col items-center justify-center gap-8">
        <div className="p-8 flex flex-col items-center justify-center gap-8 bg-[var(--login-bg-color)] rounded-2xl border-4 border-[var(--login-border-color)] shadow-[var(--login-shadow-color)]">
          <h4 className="text-4xl font-normal font-(family-name:--preferences-title-font) text-[var(--preferences-title-color)] text-shadow-[var(--preferences-title-shadow)] p-4">
            Selecione Seu tema
          </h4>

          <ul className="flex justify-center items-center p-4 gap-8 bg-[var(--preferences-theme-box-bg-color)] border-2 border-[var(--preferences-theme-box-border-color)] rounded-2xl shadow-[var(--preferences-theme-box-shadow)]">
            {availableThemes.map((themeOption) => (
              <li key={themeOption}>
                <input
                  id={`theme-option-${themeOption}`}
                  type="radio"
                  name="theme"
                  value={themeOption}
                  checked={theme === themeOption}
                  onChange={() => updateTheme(themeOption)}
                  disabled={isUpdating}
                  className="hidden"
                />
                <Label
                  htmlFor={`theme-option-${themeOption}`}
                  className={
                    `flex cursor-pointer items-center justify-center rounded-4xl border-2 p-4 text-4xl font-(family-name:--preferences-theme-font) text-[var(--preferences-theme-color)] hover:text-[var(--preferences-theme-btn-text-hover)] focus:text-[var( --preferences-theme-btn-text-hover)] active:text-[var(--preferences-theme-btn-text-active)] border-[var(--preferences-theme-btn-border-color)] hover:border-[var(--preferences-theme-btn-border-hover)] focus:border-[var(--preferences-theme-btn-border-hover)] active:border-[var(--preferences-theme-btn-border-active)] shadow-[var(--preferences-theme-btn-shadow)] hover:shadow-[var(--preferences-theme-btn-shadow-hover)] focus:shadow-[var(--preferences-theme-btn-shadow-hover)] active:shadow-[var(--preferences-theme-btn-shadow-active)] bg-[var(--preferences-theme-btn-bg-color)] hover:bg-[var(--preferences-theme-btn-bg-hover)] focus:bg-[var(--preferences-theme-btn-bg-hover)] active:bg-[var(--preferences-theme-btn-bg-active)]
                    ${theme === themeOption ? 'ring-2 ring-offset-2 ring-[var(--preferences-theme-btn-border-active)]' : ''}`
                  }
                >
                  {themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}
                </Label>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center h-[124px] justify-center gap-16">
          <div className="flex flex-col  justify-between h-full items-center gap-8">
            <h4 className="text-xl font-medium font-(family-name:--preferences-theme-title-font) text-[var(--preferences-theme-title-color)] text-shadow-[var(--preferences-theme-title-shadow)] p-4  ">
              Selecione o idioma
            </h4>

            <ul className="flex justify-center items-center p-4 gap-8  bg-[var(--preferences-theme-box-bg-color)] border-2 border-[var(--preferences-theme-box-border-color)] rounded-2xl shadow-[var(--preferences-theme-box-shadow)]">
              {availableLanguages.map((langOption) => (
                <li key={langOption}>
                  <input
                    type="radio"
                    id={`lang-option-${langOption}`}
                    name="language"
                    value={langOption}
                    checked={langOption === preferences!.language}
                    onChange={() => updateLanguage(langOption)}
                    disabled={isUpdating}
                    className="hidden"
                  />
                  <Label
                    htmlFor={`lang-option-${langOption}`}
                    className={
                      `flex cursor-pointer items-center justify-center rounded-4xl border-2 p-4 text-2xl font-(family-name:--preferences-theme-font) text-[var(--preferences-theme-color)] hover:text-[var(--preferences-theme-btn-text-hover)] focus:text-[var( --preferences-theme-btn-text-hover)] checked:text-[var(--preferences-theme-btn-text-active)] border-[var(--preferences-theme-btn-border-color)] hover:border-[var(--preferences-theme-btn-border-hover)] focus:border-[var(--preferences-theme-btn-border-hover)] checked:border-[var(--preferences-theme-btn-border-active)] shadow-[var(--preferences-theme-btn-shadow)] hover:shadow-[var(--preferences-theme-btn-shadow-hover)] focus:shadow-[var(--preferences-theme-btn-shadow-hover)] checked:shadow-[var(--preferences-theme-btn-shadow-active)] bg-[var(--preferences-theme-btn-bg-color)] hover:bg-[var(--preferences-theme-btn-bg-hover)] focus:bg-[var(--preferences-theme-btn-bg-hover)] checked:bg-[var(--preferences-theme-btn-bg-active)]
                      ${langOption === preferences!.language ? 'ring-2 ring-offset-2 ring-[var(--preferences-theme-btn-border-active)]' : ''}`
                    }
                  >
                    {langOption}
                  </Label>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-start items-center h-[124px]">
            <h4 className="text-xl font-medium font-(family-name:--preferences-theme-title-font) text-[var(--preferences-theme-title-color)] text-shadow-[var(--preferences-theme-title-shadow)] p-4   mb-16">
              Receber notificações por E-mail
            </h4>

            <ToggleSwitch
              checked={preferences?.notification?.email ?? false}
              sizing="md"
              onChange={(checked) => updateEmailNotification(checked)}
              disabled={isUpdating}
              label={
                preferences?.notification?.email ? "Ativado" : "Desativado"
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
