import { BrainCircuit, Fingerprint, NotebookPen, Palette } from "lucide-react";
import FeaturesCard from "../../components/FeaturesCard/FeaturesCard";
import style from "./FeaturesSection.module.css";
import { motion, type Variants } from "framer-motion";
import { useTranslation } from "react-i18next";

const featureIcons = [
  { id: 1, Icon: NotebookPen },
  { id: 2, Icon: BrainCircuit },
  { id: 3, Icon: Palette },
  { id: 4, Icon: Fingerprint },
];

type TranslatedFeature = {
  title: string;
  description: string;
};

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
    const { t } = useTranslation();


    const translatedFeatures = t('homePage.featuresSection.features', { returnObjects: true }) as TranslatedFeature[];

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
            {translatedFeatures.map((feature, index) => (
                <motion.li key={feature.title} variants={itemVariants}>
                    <FeaturesCard 
                      Icon={featureIcons[index].Icon}
                      title={feature.title}
                      description={feature.description}
                    />
                </motion.li>
            ))}
        </motion.ul>
    </section>
    );
  };
  
  export default FeaturesSection;