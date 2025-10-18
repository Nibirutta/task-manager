import { useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../lib/Reui/select/select";


const UserSettingsPage = () => {
  useEffect(() => {
    document.title = "Task Manager | Configurações";
  }, []);



  return (
    <>
    <h1 className="text-2xl font-bold">Configurações do Usuário</h1>

    <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baixo">Baixa</SelectItem>
                  <SelectItem value="média">Média</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                </SelectContent>
              </Select>
      
    </>
  );
};

export default UserSettingsPage;

