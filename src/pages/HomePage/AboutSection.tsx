import DevCard from "../../components/DevCard/DevCard";
import { motion,type  Variants } from "framer-motion";
import { useTranslation } from "react-i18next";

const devsData = [
  {
    avatar: "/src/assets/imgs/avatar/20250123_165309.jpg",
    name: "Lucino Campos",
    portfolioImage: "/src/assets/imgs/icons/ALucin4do-logo.png",
    portfolio: "https://alucinado-dev.vercel.app/",
    github: "https://github.com/Alucinado-dev",
    linkedin: "https://www.linkedin.com/in/lucino-de-campos/",
    color1: "#05f2db",
    color2: "#00ff00",
    color3: "#d9048e",
    stacks: [
      "React",
      "Tailwind",
      "Vite",
      "TypeScript",
      "React-Router",
      "Radix",
      "Framer-Motion",
    ],
  },
  {
    avatar: "/src/assets/imgs/avatar/FotoPerfilLucas.jpg",
    name: "Lucas Silva",
    github: "https://github.com/Nibirutta",
    linkedin: "https://www.linkedin.com/in/lucasaugustodev/",
    portfolioImage: "/src/assets/imgs/icons/NibiruttaPNG.png",
    portfolio: "https://www.artstation.com/lucasaugust",
    color1: "#D9E1E4",
    color2: "#F0D264",
    color3: "#2A4D8C",
    stacks: ["TypeScript", "Nest-JS", "Mongo-DB", "Rabbit-MQ", "JWT", "RxJS"],
  },
];

const cardContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};


type AboutSectionProps = {
  title: string;
  text: string;
  children?: React.ReactNode;
};

const AboutSection = ({ title, text }: AboutSectionProps) => {
  const { t } = useTranslation();

  const translatedDevsData = devsData.map(dev => {
    const devKey = dev.name.split(' ')[0].toLowerCase();     return {
      ...dev,
      role: t(`homePage.aboutSection.devs.${devKey}.role`)
    };
  });

  return (
    <section className="flex flex-col-reverse  justify-center gap-12 items-center min-h-dvh py-8 w-full" id="about">
      <motion.div 
        className="flex flex-col xl:flex-row justify-center items-center gap-12  p-4 "
        variants={cardContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {translatedDevsData.map((dev) => (
          <motion.div key={dev.name} variants={cardItemVariants}><DevCard {...dev} role={dev.role} /></motion.div>
        ))}
      </motion.div>

      <div className="flex flex-col  items-center justify-center h-full py-12  gap-8 ">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5 }}
          className="p-4 text-6xl font-bold text-center text-[var(--about-title-color)] text-shadow-[var(--about-title-shadow)]
            font-(family-name:--about-title-font) "
        >
          {title}
        </motion.h2>

        <motion.p 
          className="px-12 lg:px-32 text-xl xl:text-3xl font-medium text-[var(--about-text-color)] font-(family-name:--about-text-font)"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {text}
        </motion.p>
      </div>
    </section>
  );
};

export default AboutSection;
