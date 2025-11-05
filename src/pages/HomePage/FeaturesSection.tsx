import { BrainCircuit, Fingerprint, NotebookPen, Palette } from "lucide-react";
import FeaturesCard from "../../components/FeaturesCard/FeaturesCard";
import style from "./FeaturesSection.module.css";
import { motion, type Variants } from "framer-motion";

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

// Variantes de animação para o container (ul) e os itens (li)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Atraso de 0.2s entre cada item filho
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 }, // Começa 20px para baixo e invisível
  visible: { y: 0, opacity: 1 }, // Anima para a posição original e visível
};


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

        <motion.ul 
            className={style.featuresContainer}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }} // A animação ocorre uma vez quando 50% do elemento está visível
        >
            {featuresData.map((feature) => (
                <motion.li key={feature.id} variants={itemVariants}>
                    <FeaturesCard {...feature} />
                </motion.li>
            ))}
        </motion.ul>
    </section>
    );
  };
  
  export default FeaturesSection;