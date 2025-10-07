import { Link } from "react-router-dom";
import style from "./HeroSection.module.css"; 
import AnimatedBackground from "../../lib/Nurui/AnimatedBackground";



interface HeroSectionProps {
    title: string;
    subtitle: string;
    dismiss: string
    children?: React.ReactNode;
}

const HeroSection = ({title, subtitle, dismiss}: HeroSectionProps) =>{


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
                    <Link to="/register" className={`${style.btn} ${style.btnPrimary}`}>
                        Registrar-se
                    </Link>
                    <Link to="/login" className={`${style.btn} ${style.btnSecondary}`}>
                        Login
                    </Link>
                </div>
                <p className={style.dismissText}>{dismiss}</p>
            </div>

            <figure className={style.heroImageContainer}>

            </figure>
        </section>
    )
}

export default HeroSection;
