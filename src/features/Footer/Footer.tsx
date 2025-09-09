import { Github, Linkedin, Globe } from 'lucide-react';
import alucinadoLogo from './ALucin4do-logo.png';
 
// --- Subcomponente para os links dos Desenvolvedores ---
// Criar um componente pequeno como este ajuda a não repetir código
// e mantém o componente principal (Footer) mais limpo.
interface DeveloperLinkProps {
  name: string;
  githubUrl: string;
  linkedinUrl: string;
  portfolioUrl: string;
  isAlucinado?: boolean;
}
 
const DeveloperLink = ({ name, githubUrl, linkedinUrl, portfolioUrl, isAlucinado = false }: DeveloperLinkProps) => (
  <div className="flex flex-col items-center md:items-start gap-2">
    <h4 className="font-bold text-lg">{name}</h4>
    <div className="flex gap-4 items-center">
      <a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`${name}'s Github profile`} className="text-gray-400 hover:text-white transition-colors">
        <Github />
      </a>
      <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label={`${name}'s LinkedIn profile`} className="text-gray-400 hover:text-white transition-colors">
        <Linkedin />
      </a>
      <a href={portfolioUrl} target="_blank" rel="noopener noreferrer" aria-label={`${name}'s Portfolio`} className="text-gray-400 hover:text-white transition-colors">
        {isAlucinado ? <img src={alucinadoLogo} alt="Logo of Alucinado-Dev" className='w-6 h-6' /> : <Globe />}
      </a>
    </div>
  </div>
);
 
// --- Componente Principal do Footer ---
function Footer() {
  return (
    // Usar 'mt-auto' em um layout flexível (flex-col) no seu App.tsx
    // é a forma mais robusta de manter o footer no final da página.
    <footer className="bg-gray-900 text-gray-300 p-8 w-full mt-auto">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Coluna 1: Navegação */}
        <div>
          <h3 className="font-bold text-white text-xl mb-4">Navegação</h3>
          <ul className="space-y-2">
            <li><a href="/home" className="hover:text-white hover:underline transition-colors">Home</a></li>
            <li><a href="/login" className="hover:text-white hover:underline transition-colors">Login</a></li>
            <li><a href="/register" className="hover:text-white hover:underline transition-colors">Registrar</a></li>
          </ul>
        </div>
 
        {/* Coluna 2: O Projeto */}
        <div>
          <h3 className="font-bold text-white text-xl mb-4">O Projeto</h3>
          <ul className="space-y-2">
            <li><a href="https://github.com/Nibirutta/task-manager" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline transition-colors inline-flex items-center gap-2"><Github size={16} /> Repositório Front-end</a></li>
            <li><a href="https://github.com/Nibirutta/task-api" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline transition-colors inline-flex items-center gap-2"><Github size={16} /> Repositório Back-end</a></li>
          </ul>
        </div>
 
        {/* Coluna 3: Desenvolvedores */}
        <div>
          <h3 className="font-bold text-white text-xl mb-4">Desenvolvedores</h3>
          <div className="flex flex-col gap-6 items-center md:items-start">
            <DeveloperLink name="Nibirutta" githubUrl="https://github.com/Nibirutta" linkedinUrl="#" portfolioUrl="#" />
            <DeveloperLink name="ALucin4do" githubUrl="#" linkedinUrl="#" portfolioUrl="https://alucinado-dev.vercel.app" isAlucinado={true} />
          </div>
        </div>
      </div>
 
      <hr className="my-8 border-gray-700" />
 
      <div className="text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Task Manager. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
 
export default Footer;


/*             <a href="https://alucinado-dev.vercel.app" target="_blank" rel="noopener noreferrer"  className="font-black text-(--text-color-footer)  before:content-['</ALUCINADO>']  hover:font-(family-name:--tech) hover:bg-(image:--logo-gradient) hover:bg-clip-text hover:text-transparent hover:text-shadow-(--logo-shadow) focus:font-(family-name:--tech) focus:bg-(image:--logo-gradient) focus:bg-clip-text focus:text-transparent focus:text-shadow-(--logo-shadow)"></a>   */


/*             <img src={alucinadoLogo} alt="Logo of Alucinado-Dev"  className='w-[35px] h-[35px]'/> */