
import style from './Footer.module.css'
import ReactIcon from '../../assets/svg/react.svg';
import NodeIcon from '../../assets/svg/nodedotjs.svg';
import DevCard from '../../components/DevCard/DevCard';
import idGenerator from '../../utils/idGenerator';


function Footer() {

  return (
    // Usar 'mt-auto' em um layout flexível (flex-col) no seu App.tsx
    // é a forma mais robusta de manter o footer no final da página.
    <footer className="bg-gray-900 text-gray-300 p-8 w-full mt-auto">
      <div className={style.content}>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
          <div>
            <h3 className="font-bold text-white text-xl mb-4">Navegação</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-white hover:underline transition-colors">Home</a></li>
              <li><a href="/login" className="hover:text-white hover:underline transition-colors">Login</a></li>
              <li><a href="/register" className="hover:text-white hover:underline transition-colors">Registrar</a></li>
            </ul>
          </div>
  
          <div>
            <h3 className="font-bold text-white text-xl mb-4">O Projeto</h3>
            <ul className="space-y-2">

              <li>
                <a href="https://github.com/Nibirutta/task-manager" target="_blank" rel="noopener noreferrer" className={style.react}>
                  <ReactIcon/> 
                  <span> Repositório Front-end</span>
                </a>
              </li>

              <li>
                <a href="https://github.com/Nibirutta/task-api" target="_blank" rel="noopener noreferrer" className={style.node}>
                  <NodeIcon/> 
                  <span> Repositório Back-end</span>
                </a>
              </li>

            </ul>

          </div>
  
  
          <div>
            <h3 className="font-bold text-white text-xl mb-4">Desenvolvedores</h3>
            <div className="flex flex-col gap-6 items-center md:items-start">
              <DevCard
                key={idGenerator()}
                avatar='/src/assets/imgs/avatar/20250123_165309.jpg'
                name='Lucino Campos'
                portfolioImage='/src/assets/favicon/ALucin4do-logo.png'
                portfolio='https://alucinado-dev.vercel.app/'
                github='https://github.com/Alucinado-dev'
                linkedin='https://www.linkedin.com/in/lucino-de-campos/'
                color1='#05f2db'
                color2='#00ff00'
                color3='#d9048e'
              />

              <DevCard
                key={idGenerator()}
                avatar='/src/assets/imgs/avatar/'
                name='Lucas Silva'
                github='https://github.com/Nibirutta'
                linkedin='https://www.linkedin.com/in/lucasaugustodev/'
                portfolioImage='' 
                portfolio='https://www.artstation.com/lucasaugust'
                color1='#05f2db'
                color2='#00ff00'
                color3='#d9048e'
              />
            </div>
          </div>
        </div>
  
        <hr className="my-8 border-gray-700" />
  
        <div className="text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Task Manager. Todos os direitos reservados.</p>
        </div>

      </div>
    </footer>
  );
}
 
export default Footer;


/*             <a href="https://alucinado-dev.vercel.app" target="_blank" rel="noopener noreferrer"  className="font-black text-(--text-color-footer)  before:content-['</ALUCINADO>']  hover:font-(family-name:--tech) hover:bg-(image:--logo-gradient) hover:bg-clip-text hover:text-transparent hover:text-shadow-(--logo-shadow) focus:font-(family-name:--tech) focus:bg-(image:--logo-gradient) focus:bg-clip-text focus:text-transparent focus:text-shadow-(--logo-shadow)"></a>   */


/*             <img src={alucinadoLogo} alt="Logo of Alucinado-Dev"  className='w-[35px] h-[35px]'/> */