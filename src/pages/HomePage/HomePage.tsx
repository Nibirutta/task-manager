import DemoSection from "./DemoSection";
import AboutSection from "./AboutSection";
import CTA from "./CTA";
import { homePageContent } from "./homePageContent";
import { useEffect } from "react";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";

const HomePage = () => {
  useEffect(() => {
    document.title = homePageContent.meta.title;
  }, []);

  

  return (
    <>
      <HeroSection
        title={homePageContent.heroSection.title}
        subtitle={homePageContent.heroSection.subtitle}
        developed={homePageContent.heroSection.developed}
      />

      <FeaturesSection
        title={homePageContent.featuresSection.title}
        subtitle={homePageContent.featuresSection.subtitle}
      />

      <DemoSection
        title={homePageContent.demoSection.title}
        subtitle={homePageContent.demoSection.subtitle}
        figcaption={homePageContent.demoSection.figcaption}
      />

      <AboutSection
        title={homePageContent.aboutSection.title}
        text={homePageContent.aboutSection.text}
      />
      <CTA title={homePageContent.ctaSection.title} />
    </>
  );
};

export default HomePage;

