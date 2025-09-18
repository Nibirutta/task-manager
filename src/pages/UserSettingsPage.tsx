import { useEffect } from "react";

const UserSettingsPage = () => {
  useEffect(() => {
    document.title = "Task Manager | Configurações";
  }, []);

  return (
    <h1 className="text-2xl font-bold">Configurações do Usuário</h1>
  );
};

export default UserSettingsPage;

