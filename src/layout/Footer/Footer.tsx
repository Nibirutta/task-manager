
import style from './Footer.module.css'
import { useTranslation } from 'react-i18next';
import ReactIcon from '../../assets/svg/react.svg?react';
import NodeIcon from '../../assets/svg/nodedotjs.svg?react';



function Footer() {
  const { t } = useTranslation();

  return (
    <footer className={style.footer}>
      <div className={style.content}>
        <div className={style.upcontainer}>
        
          <div className={style.navegation}>
            <h3>{t('layout.footer.navigation')}</h3>
            
            <nav>
              <ul>
              <li><a href="/">{t('layout.navbar.home')}</a></li>
              <li><a href="/login">{t('layout.navbar.login')}</a></li>
              <li><a href="/register">{t('layout.navbar.register')}</a></li>
              </ul>
            </nav> 
          </div>



          <div className={style.repositories}>
            <h3>{t('layout.footer.project')}</h3>
            <ul>
              <li>
                <a href="https://github.com/Nibirutta/task-manager" target="_blank" rel="noopener noreferrer" className={style.react}>
                  <ReactIcon/> 
                  <span>{t('layout.footer.frontendRepo')}</span>
                </a>
              </li>

              <li>
                <a href="https://github.com/Nibirutta/task-api" target="_blank" rel="noopener noreferrer" className={style.node}>
                  <NodeIcon/> 
                  <span>{t('layout.footer.backendRepo')}</span>
                </a>
              </li>

            </ul>

          </div>
        </div>
  
        <div className={style.copyright}>
          <p>{t('layout.footer.copyright', { year: new Date().getFullYear() })}</p>
        </div>

      </div>
    </footer>
  );
}
 
export default Footer;


/*             <a href="https://alucinado-dev.vercel.app" target="_blank" rel="noopener noreferrer"  className="font-black text-(--text-color-footer)  before:content-['</ALUCINADO>']  hover:font-(family-name:--tech) hover:bg-(image:--logo-gradient) hover:bg-clip-text hover:text-transparent hover:text-shadow-(--logo-shadow) focus:font-(family-name:--tech) focus:bg-(image:--logo-gradient) focus:bg-clip-text focus:text-transparent focus:text-shadow-(--logo-shadow)"></a>   */


/*             <img src={alucinadoLogo} alt="Logo of Alucinado-Dev"  className='w-[35px] h-[35px]'/> */