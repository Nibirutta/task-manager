import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { PreferencesSection } from "./PreferencesSection";
import { DangerZoneSection } from "./DangerZoneSection";
import ProfileSection from "./ProfileSection";
import { SecuritySection } from "./SecuritySection";

const UserSettingsPage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("userSettingsPage.meta.title");
  }, [t]);

  // Adiciona um container para melhor espaçamento e layout
  return (
    <div className="flex flex-col items-center w-full gap-16">
      <ProfileSection />
      <PreferencesSection />
      <SecuritySection />
      <DangerZoneSection />
    </div>
  );
};

export default UserSettingsPage;
