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
    <div className="container mx-auto max-w-3xl py-10">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Configurações</h1>
        <div className="space-y-12">
          <ProfileSection />
          <PreferencesSection />
          <SecuritySection />
          <DangerZoneSection />
        </div>
      </div>
    </div>
  );
};

export default UserSettingsPage;
