import { useEffect } from "react";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import DemoSection from "./DemoSection";
import AboutSection from "./AboutSection";

const HomePage = () => {
  useEffect(() => {
    document.title =
      "Task Manager | Organize suas tarefas com prioridade inteligente";
  }, []);
  return (
    <>
      <HeroSection
        title="Task Manager"
        subtitle="Organize suas tarefas com um design simples e prioridade inteligente"
        developed="Open source • Feito com ❤ por devs independentes."
      />

      <FeaturesSection
        title="O que nos torna únicos?"
        subtitle="Produtividade com propósito — cada recurso foi pensado pra facilitar sua rotina"
      />

      <DemoSection
        title="Veja o Task Manager em ação"
        subtitle="Um design simples, rápido e feito pra ajudar você a focar no que importa."
        figcaption="Interface intuitiva, leve e totalmente personalizável."
      />

      <AboutSection
        title="Sobre o projeto"
        text="O Task Manager é um projeto open source desenvolvido por devs independentes apaixonados por produtividade e design. Nossa missão é criar uma ferramenta simples, bonita e inteligente — que aprenda com o usuário e se adapte ao seu ritmo.
        
        Além disso, queremos que qualquer pessoa possa contribuir com ideias, código ou temas novos. Porque acreditamos que tecnologia boa é aquela construída em comunidade."
      />
    </>
  );
};

export default HomePage;
