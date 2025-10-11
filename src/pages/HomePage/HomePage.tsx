import { useEffect } from "react";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";




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

      <FeaturesSection title="O que nos torna únicos?" subtitle='Produtividade com propósito — cada recurso foi pensado pra facilitar sua rotina'/>

      
    </>
  );
};

export default HomePage;

