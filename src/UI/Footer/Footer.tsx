
import style from './Footer.module.css'
import ReactIcon from '../../assets/svg/react.svg?react';
import NodeIcon from '../../assets/svg/nodedotjs.svg?react';
import DevCard from '../../components/DevCard/DevCard';
import idGenerator from '../../utils/idGenerator';


function Footer() {

  return (

    <footer className={style.footer}>
      <div className={style.content}>
        <div className={style.upcontainer}>
        
          <div className={style.navegation}>
            <h3>Navegação</h3>
            
            <nav>
              <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/login">Login</a></li>
              <li><a href="/register">Registrar</a></li>
              </ul>
            </nav> 
          </div>

          <hr/>

          <div className={style.repositories}>
            <h3>O Projeto</h3>
            <ul>
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
  
          <hr/>

          <div className={style.developers}>
            <h3 >Desenvolvedores</h3>
            <div className={style.dev}>
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
                avatar='/src/assets/imgs/avatar/FotoPerfilLucas.jpg'
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
  
        <hr  />
  
        <div className={style.copyright}>
          <p>&copy; {new Date().getFullYear()} Task Manager. Todos os direitos reservados.</p>
        </div>

      </div>
    </footer>
  );
}
 
export default Footer;


/*             <a href="https://alucinado-dev.vercel.app" target="_blank" rel="noopener noreferrer"  className="font-black text-(--text-color-footer)  before:content-['</ALUCINADO>']  hover:font-(family-name:--tech) hover:bg-(image:--logo-gradient) hover:bg-clip-text hover:text-transparent hover:text-shadow-(--logo-shadow) focus:font-(family-name:--tech) focus:bg-(image:--logo-gradient) focus:bg-clip-text focus:text-transparent focus:text-shadow-(--logo-shadow)"></a>   */


/*             <img src={alucinadoLogo} alt="Logo of Alucinado-Dev"  className='w-[35px] h-[35px]'/> */