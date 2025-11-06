import DemoSection from "./DemoSection";
import AboutSection from "./AboutSection";
import CTA from "./CTA";
import { useEffect} from "react";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("homePage.meta.title");
  }, [t]);

  return (
    <>
      <HeroSection
        title={t("homePage.heroSection.title")}
        subtitle={t("homePage.heroSection.subtitle")}
        developed={t("homePage.heroSection.developed")}
      />

      <FeaturesSection
        title={t("homePage.featuresSection.title")}
        subtitle={t("homePage.featuresSection.subtitle")}
      />

      <DemoSection
        title={t("homePage.demoSection.title")}
        subtitle={t("homePage.demoSection.subtitle")}
        figcaption={t("homePage.demoSection.figcaption")}
      />

      <AboutSection
        title={t("homePage.aboutSection.title")}
        text={t("homePage.aboutSection.text")}
      />
      <CTA title={t("homePage.ctaSection.title")} />
    </>
  );
};

export default HomePage;
