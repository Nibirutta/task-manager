import { BrainCircuit, Fingerprint, NotebookPen, Palette } from "lucide-react";
import FeaturesCard from "../../components/FeaturesCard/FeaturesCard";
import style from "./FeaturesSection.module.css";

const featuresData = [
    {
      id: 1,
      Icon: NotebookPen,
      title: "Gerenciamento de Tarefas",
      description:
        "crie, edite, exclua suas tarefas com nosso sistema de gerenciamento inspirado em Kanban",
    },
    {
      id: 2,
      Icon: BrainCircuit,
      title: "Prioridade Inteligente",
      description:
        "priorize suas tarefas com base na importância real, não só na ordem da lista",
    },
    {
      id: 3,
      Icon: Palette,
      title: "Selecione sua Vibe",
      description: "Escolha o tema que combina com seu momento",
    },
    {
      id: 4,
      Icon: Fingerprint,
      title: "Segurança de ponta a ponta",
      description: "Somente você tem permissão de acessar suas tarefas",
    },
  ];


type FeaturesSectionProps = {
    title: string,
    subtitle: string,
    children?: React.ReactNode,
}

const FeaturesSection = ({title, subtitle}: FeaturesSectionProps) => {
    return (
    <section className={style.section}>  
        <h2 className={style.title}>{title}</h2>
        <p className={style.subtitle}>{subtitle}</p>

        <ul className={style.featuresContainer}>
            {featuresData.map((feature) => (
                <li key={feature.id}>
                    <FeaturesCard {...feature} />
                </li>
            ))}
        </ul>
    </section>
    );
  };
  
  export default FeaturesSection;