import { useEffect } from "react";



const DashboardPage = () => {
  useEffect(() => {
    document.title = "Task Manager | Dashboard";
  }, []);
  return (
    <div className="w-full max-w-md">
      <h1 className="text-2xl font-bold text-center">Página de Dashboard</h1>
    </div>
  );
};

export default DashboardPage;