import { useEffect } from 'react';

import { PreferencesSection } from "./PreferencesSection";
import { DangerZoneSection } from "./DangerZoneSection";
import ProfileSection from './ProfileSection';
import { SecuritySection } from './SecuritySection';


const UserSettingsPage = () => {
  useEffect(() => {
    document.title = "Task Manager | Configurações";
  }, []);

  // Adiciona um container para melhor espaçamento e layout
  return (
    <div className="flex flex-col items-center w-full gap-16 py-16">
      <ProfileSection />
      <PreferencesSection />
      <SecuritySection />
      <DangerZoneSection />
    </div>
  );
};

export default UserSettingsPage;
