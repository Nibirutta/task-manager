import { type CSSProperties } from "react";
import style from "./DevCard.module.css";

type DevCardProps = {
  name: string;
  avatar: string;
  linkedin: string;
  github: string;
  portfolio: string;
  role: string;
  description?: string;
  stacks?: string[];
  portfolioImage?: string;
  color1: string;
  color2: string;
  color3: string;
};

const DevCard = ({
  name,
  avatar,
  linkedin,
  github,
  portfolio,
  portfolioImage,
  color1,
  color2,
  color3,
  role,
  description,
  stacks,
}: DevCardProps) => {
  return (
    <div
      className={style.card}
      style={
        {
          "--color-1": color1,
          "--color-2": color2,
          "--color-3": color3,
        } as CSSProperties
      }
    >
      <div className={style.content}>
        <header className={style.header}>
          <figure className={style.avatar}>
            <img src={avatar} alt={`Avatar de ${name}`} />
          </figure>

          <h5 className={style.role}>{role}</h5>
        </header>

        <main>
          <h4 className={style.title}>{name}</h4>

          {description && <p className={style.description}>{description}</p>}

            {stacks && (
              <div>
                <h6 className={style.tech}> Tecnologias Utilizadas</h6>
                <ul className={style.stackList}>
                  {stacks.map((stack, index) => (
                    <li key={index}  className={`${style.stackItem} ${style[stack.toLowerCase()]}`}>
                      {stack}
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </main>

        <footer>
          <div className={style.social}>
            <a
              className={style.linkedin}
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`ir para o perfil do linkedin do ${name}`}
            >
              <img
                src="/src/assets/imgs/icons/linkedin.png"
                alt="logo do linkedin"
              />
            </a>

            <a
              className={style.github}
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`ir para o perfil do github do ${name}`}
            >
              <img
                src="/src/assets/imgs/icons/github.png"
                alt="logo do github"
              />
            </a>
            <a
              className={style.portfolio}
              href={portfolio}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`ir para o portfolio do ${name}`}
            >
              <img src={portfolioImage} alt={`logo do portfolio do ${name}`} />
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DevCard;
