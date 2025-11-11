import { useTranslation } from "react-i18next";

import { PreferencesSection } from "./PreferencesSection";
import { DangerZoneSection } from "./DangerZoneSection";
import ProfileSection from "./ProfileSection";
import { SecuritySection } from "./SecuritySection";
import usePageMetadata from "../../hooks/usePageMetadata";

const UserSettingsPage = () => {
  const { t } = useTranslation();

  usePageMetadata({
    title: t("userSettingsPage.meta.title"),
    description: t("userSettingsPage.meta.description"),
    ogTitle: t("userSettingsPage.meta.ogTitle"),
    ogDescription: t("userSettingsPage.meta.ogDescription"),
  });

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
