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
            <AnimatedBackground
            line1Color="var(--hero-bg-color-1)"
            line2Color="var(--hero-bg-color-2)"
            blob1Color="var(--hero-bg-color-3)"
            blob2Color="var(--hero-bg-color-4)"
            />
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
                        text="REGISTRAR"
                        className="transition-all duration-300 ease-in-out"
                        textFont="var(--cta-btn-font)"
                        particleCount={360}
                        attractRadius={1000}
                        icon={UserRoundPlus}
                        backgroundColor="var(--cta-button-bg)"
                        textColor="var(--cta-button-text)"
                        ballColor="var(--cta-button-ball-color)"
                        textSize="1.6rem"

                        ></MagnetButton>
                    </Link>

                    <Link to="/login">
                        <BorderAnimationButton
                        text="LOGIN"
                        className="transition-all duration-300 ease-in-out hover:scale-110 focus:scale-110 active:scale-100"
                        icon={LogIn}
                        textFont="var(--cta-btn-font)"
                        backgroundColor="var(--cta-button-secondary-bg)"
                        textColor="var(--cta-button-secondary-text)"
                        textSize="1.6rem"
                        borderColor1="var(--greetings-color-2)"
                        borderColor2="var(--greetings-color-4)"

                        ></BorderAnimationButton>
                    </Link>
                </div>
                <p className={style.developedText}>{developed}</p>

            <figure className={style.heroImageContainer}>
                <img src={heroImage} alt="Ilustração de pessoas organizando tarefas em um quadro." />
            </figure>
            </div>
        </section>
    )
}

export default HeroSection;
