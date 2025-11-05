import { Link } from "react-router-dom";
import style from "./HeroSection.module.css"; 
import AnimatedBackground from "../../lib/Nurui/AnimatedBackground";
import BorderAnimationButton from "../../lib/Nurui/BorderAnimationButton";
import { LogIn, UserRoundPlus } from "lucide-react";
import MagnetButton from "../../lib/Nurui/MagnetButton";
import HeroImage from "../../assets/svg/Hero.svg?react";
import { motion, type Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};



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
            <motion.div 
                className={style.heroContent}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.h1 className={style.title} variants={itemVariants}>
                    {title}
                </motion.h1>

                <motion.p className={style.subtitle} variants={itemVariants}>
                    {subtitle}
                </motion.p>

                
            <motion.figure className={style.heroImageContainer} variants={itemVariants}>
                <HeroImage className={style.heroImage} />
            </motion.figure>
                <motion.div className={style.ctaButtons} variants={itemVariants}>
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
                </motion.div>
                <motion.p className={style.developedText} variants={itemVariants}>{developed}</motion.p>

            </motion.div>
        </section>
    )
}

export default HeroSection;
