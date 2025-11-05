import DevCard from "../../components/DevCard/DevCard";

const devsData = [
  {
    key: "dev-card-lucino",
    avatar: "/src/assets/imgs/avatar/20250123_165309.jpg",
    name: "Lucino Campos",
    portfolioImage: "/src/assets/imgs/icons/ALucin4do-logo.png",
    portfolio: "https://alucinado-dev.vercel.app/",
    github: "https://github.com/Alucinado-dev",
    linkedin: "https://www.linkedin.com/in/lucino-de-campos/",
    color1: "#05f2db",
    color2: "#00ff00",
    color3: "#d9048e",
    role: "Front-End",
    stacks: [
      "React",
      "Tailwind",
      "Vite",
      "TypeScript",
      "React-Router",
      "Zod",
      "Radix",
      "Framer-Motion",
    ],
  },
  {
    key: "dev-card-lucas",
    avatar: "/src/assets/imgs/avatar/FotoPerfilLucas.jpg",
    name: "Lucas Silva",
    github: "https://github.com/Nibirutta",
    linkedin: "https://www.linkedin.com/in/lucasaugustodev/",
    portfolioImage: "/src/assets/imgs/icons/NibiruttaPNG.png",
    portfolio: "https://www.artstation.com/lucasaugust",
    color1: "#D9E1E4",
    color2: "#F0D264",
    color3: "#2A4D8C",
    role: "Back-End",
    stacks: ["TypeScript", "Nest-JS", "Mongo-DB", "Rabbit-MQ", "JWT", "RxJS"],
  },
];

type AboutSectionProps = {
  title: string;
  text: string;
  children?: React.ReactNode;
};

const AboutSection = ({ title, text }: AboutSectionProps) => {
  return (
    <section className="flex flex-col-reverse  justify-center gap-12 items-center min-h-dvh py-8 w-full" id="about">
      <div className="flex flex-col xl:flex-row justify-center items-center gap-12  p-4 ">
        {devsData.map((dev) => (
          <DevCard {...dev} />
        ))}
      </div>

      <div className="flex flex-col  items-center justify-center h-full py-12  gap-8 ">
        <h2
          className="p-4 text-6xl font-bold text-center text-[var(--about-title-color)] text-shadow-[var(--about-title-shadow)]
            font-(family-name:--about-title-font) "
        >
          {title}
        </h2>

        <p className="px-12 text-xl xl:text-3xl font-medium text-[var(--about-text-color)] font-(family-name:--about-text-font)">
          {text}
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
