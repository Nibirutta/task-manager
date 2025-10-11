import { BrainCircuit, Fingerprint, NotebookPen, Palette } from "lucide-react";
import FeaturesCard from "../../components/FeaturesCard/FeaturesCard";


type FeaturesSectionProps = {
    title: string,
    subtitle: string,
    children?: React.ReactNode,
}

const FeaturesSection = ({title, subtitle}: FeaturesSectionProps) => {
    return (
    <section className="flex flex-col items-center justify-center gap-8 p-12">  
        <h2 className="p-4 text-6xl font-bold text-center text-[var(--features-title-color)] font-(family-name:--features-title-font) text-shadow-[var(--features-title-shadow)]">{title}</h2>
        <p className="p-4 font-(family-name:--features-subtitle-font) text-4xl text-[var(--features-subtitle-color)]">{subtitle}</p>

        <ul className="mt-12 grid grid-cols-4 grid-rows-4 gap-4 p-4">
            <li className="col-span-2 row-span-2">
                <FeaturesCard
                    key={1}
                    Icon={NotebookPen}
                    title="Gerenciamento de Tarefas"
                    description="crie, edite, exclua suas tarefas com nosso sistema de gerenciamento inspirado em Kanban"
                />
            </li>

            <li className="col-span-2 row-span-2 col-start-1 row-start-3">
                <FeaturesCard
                    key={2}
                    Icon={BrainCircuit}
                    title="Prioridade Inteligente"
                    description="priorize suas tarefas com base na importância real, não só na ordem da lista"
                    />
            </li>


            <li className="col-span-2 row-span-2 col-start-3 row-start-1">
                <FeaturesCard
                    key={3}
                    Icon={Palette}
                    title="Selecione sua Vibe"
                    description="Escolha o tema que combina com seu momento"
                    />
            </li>

            <li className="col-span-2 row-span-2 col-start-3 row-start-3">
                <FeaturesCard
                    key={4}
                    Icon={Fingerprint}
                    title="Segurança de ponta a ponta"
                    description="Somente você tem permissão de acessar suas tarefas"
                    />

            </li>


        </ul>
    </section>
    );
  };
  
  export default FeaturesSection;