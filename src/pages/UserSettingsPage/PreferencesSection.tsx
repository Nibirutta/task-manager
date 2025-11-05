
import Spinner from "../../components/Spinner/Spinner";

import usePreferences from "../../hooks/usePreferences";
import { Label } from "../../lib/Reui/label/label";

import type { languageType, themeType } from "../../types/AccountServiceTypes";
import StyledSwitch from "../../components/StyledSwitch/StyledSwitch";


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

  const availableLanguages: { label: string; value: languageType }[]
  
   = [
     { label: "Português", value: "pt-BR" },
     { label: "English", value: "en-US" }
  ];



  if (!preferences) {
    return <Spinner size={32} />;
  }

  return (
    <section className="w-full py-20 flex flex-col items-center justify-center border-b-mercury-300 border-b-4 gap-8">
      <div className="text-center flex flex-col gap-8 justify-center items-center">
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

          <ul className="grid grid-cols-2 xl:grid-cols-3 justify-center items-center p-4 gap-8 bg-[var(--preferences-theme-box-bg-color)] border-2 border-[var(--preferences-theme-box-border-color)] rounded-2xl shadow-[var(--preferences-theme-box-shadow)]">
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
                  className="hidden peer"
                />
                <Label
                  htmlFor={`theme-option-${themeOption}`}
                  className={
                    `flex cursor-pointer items-center justify-center rounded-4xl border-2 p-4 text-md font-(family-name:--preferences-theme-font) md:text-4xl
                    text-[var(--preferences-theme-btn-text-color)]       bg-[var(--preferences-theme-btn-bg-color)]       border-[var(--preferences-theme-btn-border-color)]       shadow-[var(--preferences-theme-btn-shadow)]
                    hover:text-[var(--preferences-theme-btn-text-hover)] hover:bg-[var(--preferences-theme-btn-bg-hover)] hover:border-[var(--preferences-theme-btn-border-hover)] hover:shadow-[var(--preferences-theme-btn-shadow-hover)]
                    peer-checked:text-[var(--preferences-theme-btn-text-active)] peer-checked:bg-[var(--preferences-theme-btn-bg-active)] peer-checked:border-[var(--preferences-theme-btn-border-active)] peer-checked:shadow-[var(--preferences-theme-btn-shadow-active)]`
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
            <h4 className="text-3xl font-medium font-(family-name:--preferences-theme-title-font) text-[var(--preferences-theme-title-color)] text-shadow-[var(--preferences-theme-title-shadow)] p-4  ">
              Selecione o idioma
            </h4>

            <ul className="flex flex-col sm:flex-row justify-center items-center p-4 gap-8  bg-[var(--preferences-theme-box-bg-color)] border-2 border-[var(--preferences-theme-box-border-color)] rounded-2xl shadow-[var(--preferences-theme-box-shadow)]">
              {availableLanguages.map((langOption) => (
                <li key={langOption.label}>
                  <input
                    type="radio"
                    id={`lang-option-${langOption.label}`}
                    name="language"
                    value={langOption.value}
                    checked={langOption.value === preferences!.language}
                    onChange={() => updateLanguage(langOption.value)}
                    disabled={isUpdating}
                    className="hidden peer"
                  />
                  <Label
                    htmlFor={`lang-option-${langOption.label}`}
                    className={
                      `flex cursor-pointer items-center justify-center rounded-4xl border-2 p-4 text-2xl font-(family-name:--preferences-theme-font)
                      text-[var(--preferences-theme-btn-text-color)]       bg-[var(--preferences-theme-btn-bg-color)]       border-[var(--preferences-theme-btn-border-color)]       shadow-[var(--preferences-theme-btn-shadow)]
                      hover:text-[var(--preferences-theme-btn-text-hover)] hover:bg-[var(--preferences-theme-btn-bg-hover)] hover:border-[var(--preferences-theme-btn-border-hover)] hover:shadow-[var(--preferences-theme-btn-shadow-hover)]
                      peer-checked:text-[var(--preferences-theme-btn-text-active)] peer-checked:bg-[var(--preferences-theme-btn-bg-active)] peer-checked:border-[var(--preferences-theme-btn-border-active)] peer-checked:shadow-[var(--preferences-theme-btn-shadow-active)]`
                    }
                  >
                    {langOption.label}
                  </Label>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col  justify-between h-full items-center gap-8">
            <h4 className="text-3xl font-medium font-(family-name:--preferences-theme-title-font) text-[var(--preferences-theme-title-color)] text-shadow-[var(--preferences-theme-title-shadow)] p-4  ">
              Notificações por E-mail              
            </h4>

            <StyledSwitch
                  checked={preferences.notification.isActivated}
                  onChange={(e) => updateEmailNotification(e.target.checked)}
                  disabled={isUpdating}
                />  
            
          </div>    
        </div>
      </div>
    </section>
  );
}
