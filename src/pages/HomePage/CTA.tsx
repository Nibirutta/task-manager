import { Link } from "react-router-dom";
import BorderAnimationButton from "../../lib/Nurui/BorderAnimationButton";
import { LogIn, UserRoundPlus } from "lucide-react";

import { motion, type Variants } from "framer-motion";
import { useTranslation } from "react-i18next";

type CTAProps = {
  title: string;
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3, // Atraso para os filhos começarem a animar
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const CTA = ( {title}: CTAProps) => {
  const { t } = useTranslation();

  return (
    <motion.section
      className="flex flex-col justify-center items-center p-8 gap-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.h2
        className=" text-4xl xl:text-6xl text-[var(--cta-title-color)] font-(family-name:--cta-title-font) text-shadow-[var(--cta-title-shadow)]"
        variants={itemVariants}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h2>

      <motion.div
        className="flex sm:flex-row flex-col gap-12 justify-between items-center md:gap-24 p-4"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <Link to="/registrar">
            <BorderAnimationButton
              text={t('homePage.ctaSection.registerButton')}
              className="transition-all duration-300 ease-in-out hover:scale-110 focus:scale-110 active:scale-100"
              icon={UserRoundPlus}
              textFont="Orbitron"
              backgroundColor="var(--cta-button-secondary-bg)"
              textColor="var(--cta-button-secondary-text)"
              textSize="1.6rem"
            ></BorderAnimationButton>
          </Link>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Link to="/login">
            <BorderAnimationButton
              text={t('homePage.ctaSection.loginButton')}
              className="transition-all duration-300 ease-in-out hover:scale-110 focus:scale-110 active:scale-100"
              icon={LogIn}
              textFont="Orbitron"
              backgroundColor="var(--cta-button-secondary-bg)"
              textColor="var(--cta-button-secondary-text)"
              textSize="1.6rem"
            ></BorderAnimationButton>
          </Link>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default CTA;
