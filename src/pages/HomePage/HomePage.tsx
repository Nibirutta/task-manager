import { useEffect } from "react";
import HeroSection from "./HeroSection";




const HomePage = () => {
  useEffect(() => {
    document.title = "Task Manager | Organize suas tarefas com prioridade inteligente";
  }, []);
  return (
    <>
      <HeroSection
        title="Task Manager"
        subtitle="Organize suas tarefas com um design simples e prioridade inteligente"
        developed="Open source • Feito com ❤ por devs independentes."
      />

    </>
  );
};

export default HomePage;

