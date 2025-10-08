import { Link } from "react-router-dom";
import style from "./HeroSection.module.css"; 
import AnimatedBackground from "../../lib/Nurui/AnimatedBackground";
import BorderAnimationButton from "../../lib/Nurui/BorderAnimationButton";
import { LogIn, UserRoundPlus } from "lucide-react";
import MagnetButton from "../../lib/Nurui/MagnetButton";
import heroImage from "../../assets/svg/Hero.svg";



interface HeroSectionProps {
    title: string;
    subtitle: string;
    developed: string
    children?: React.ReactNode;
}

const HeroSection = ({title, subtitle, developed}: HeroSectionProps) =>{


    return(
        <section className={style.heroSection}>
            <AnimatedBackground/>
            <div className={style.heroContent}>
                <h1 className={style.title}>
                    {title}
                </h1>
                <p className={style.subtitle}>
                    {subtitle}
                </p>
                <div className={style.ctaButtons}>
                    <Link to="/register" >
                        <MagnetButton
                        text="Registrar"
                        className="transition-all duration-300 ease-in-out"
                        textFont="Orbitron"
                        particleCount={360}
                        attractRadius={1000}
                        icon={UserRoundPlus}
                        backgroundColor="#415a77"
                        textColor="#e0e1dd"
                        ballColor="#e0e1dd"
                        textSize="1.6rem"
                    
                        ></MagnetButton>
                    </Link>

                    <Link to="/login">
                        <BorderAnimationButton
                        text="Login"
                        className="transition-all duration-300 ease-in-out hover:scale-110 focus:scale-110 active:scale-100"
                        icon={LogIn}
                        textFont="Orbitron"
                        backgroundColor="#0d1b2a"
                        textColor="#e0e1dd"
                        textSize="1.6rem"

                        ></BorderAnimationButton>
                    </Link>
                </div>
                <p className={style.developedText}>{developed}</p>

            <figure className={style.heroImageContainer}>
                <img src={heroImage} alt="Ilustração de uma pessoa organizando tarefas em um quadro." />
            </figure>
            </div>
        </section>
    )
}

export default HeroSection;
