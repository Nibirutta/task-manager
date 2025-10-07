import { useEffect } from "react";
import HeroSection from "./HeroSection";




const HomePage = () => {
  useEffect(() => {
    document.title = "Task Manager | Organize suas tarefas com prioridade inteligente";
  }, []);
  return (
    <div className="w-full max-w-md">
      <HeroSection
        title="Task Manager"
        subtitle="Organize suas tarefas com um design simples e prioridade inteligente"
        dismiss="Open source • Feito com ❤ por devs independentes."
      />

    </div>
  );
};

export default HomePage;

