
import style from './Footer.module.css'
import ReactIcon from '../../assets/svg/react.svg?react';
import NodeIcon from '../../assets/svg/nodedotjs.svg?react';



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



          <div className={style.repositories}>
            <h3>Projeto</h3>
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
  


          <div className={style.developers}>
            <h3 >Desenvolvedores</h3>
            <div className={style.dev}>
              

              
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