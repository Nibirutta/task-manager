import DevCard from "../../components/DevCard/DevCard";

type AboutSectionProps = {
  title: string;
  text: string;
  children?: React.ReactNode;
};

const AboutSection = ({ title, text }: AboutSectionProps) => {
  return (
    <section>
      <div>
        <DevCard
          key="dev-card-lucino"
          avatar="/src/assets/imgs/avatar/20250123_165309.jpg"
          name="Lucino Campos"
          portfolioImage="/src/assets/imgs/icons/ALucin4do-logo.png"
          portfolio="https://alucinado-dev.vercel.app/"
          github="https://github.com/Alucinado-dev"
          linkedin="https://www.linkedin.com/in/lucino-de-campos/"
          color1="#05f2db"
          color2="#00ff00"
          color3="#d9048e"
          role="Front-End"
          description="Apaixonado por Tecnologia"
          stacks={[
            "React",
            "Tailwind",
            "Vite",
            "TypeScript",
            "React-Router",
            "Zod",
            "Radix",
            "Framer-Motion",
          ]}
        />

        <DevCard
          key="dev-card-lucas"
          avatar="/src/assets/imgs/avatar/FotoPerfilLucas.jpg"
          name="Lucas Silva"
          github="https://github.com/Nibirutta"
          linkedin="https://www.linkedin.com/in/lucasaugustodev/"
          portfolioImage="/src/assets/imgs/icons/NibiruttaPNG.png"
          portfolio="https://www.artstation.com/lucasaugust"
          color1="#D9E1E4"
          color2="#F0D264"
          color3="#2A4D8C"
          role="Back-End"
          stacks={[
            "TypeScript",
            "Nest-JS",
            "Mongo-DB",
            "Rabbit-MQ",
            "JWT",
            "RxJS"
          ]}
        />
      </div>

      <div>
        <h2
          className="p-4 text-6xl font-bold text-center text-[var(--demo-title-font)] text-shadow-[var(--demo-title-shadow)]
            font-(family-name:--demo-title-font) "
        >
          {title}
        </h2>

        <p className="p-4 text-4xl font-medium text-[var(--demo-subtitle-color)] font-(family-name:--demo-subtitle-font)">
          {text}
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
