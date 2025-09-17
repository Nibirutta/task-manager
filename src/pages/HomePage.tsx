import { useEffect } from "react";



const HomePage = () => {
  useEffect(() => {
    document.title = "Task Manager | Home";
  }, []);
  return (
    <div className="w-full max-w-md">
      <h1 className="text-2xl font-bold text-center">Página de Home</h1>
    </div>
  );
};

export default HomePage;

