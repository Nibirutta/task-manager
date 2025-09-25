import { type CSSProperties } from "react";
import style from './DevCard.module.css'


interface IProps {
  name: string;
  avatar: string;
  linkedin: string;
  github: string;
  portfolio: string;
  portfolioImage?: string;
  color1: string;
  color2: string;
  color3: string;
}

function DevCard (props: IProps) {
  const { name, avatar, linkedin, github, portfolio, portfolioImage, color1, color2, color3 } = props;

  return (
    <div 
      className={style.card}
      style={{
        '--color-1': color1,
        '--color-2': color2,
        '--color-3': color3,
      } as CSSProperties}
    >

      <div className={style.content}>

        <figure className={style.avatar}>
          <img  src={avatar} alt={`Avatar de ${name}`}/>
        </figure>

        <h1 className={style.title}>
            {name}
        </h1>

        <div className={style.social}>
          <a className={style.linkedin} href={linkedin} target="_blank" rel="noopener noreferrer" aria-label={`ir para o perfil do linkedin do ${name}`}>
            <img src="/src/assets/imgs/icons/linkedin.png" alt="logo do linkedin" />
          </a>

          <a className={style.github} href={github} target="_blank" rel="noopener noreferrer" aria-label={`ir para o perfil do github do ${name}`}>
            <img src="/src/assets/imgs/icons/github.png" alt="logo do github" />
          </a>
          <a className={style.portfolio} href={portfolio} target="_blank" rel="noopener noreferrer" aria-label={`ir para o portfolio do ${name}`} >
            <img src={portfolioImage} alt={`logo do portfolio do ${name}`} />
          </a>
          
        </div>
      </div>

    </div>
  );
};

export default DevCard;

