import type { LucideIcon } from "lucide-react";
import styles from "./FeaturesCard.module.css";


type FeaturesCardProps = {
  title: string;
  description: string;
  Icon: LucideIcon;
};

const FeaturesCard = ({ title, description, Icon }: FeaturesCardProps) => {
  return (
    <div className={styles.featuresCard} >
      <div className={styles.featuresCardHeader}>
        {<Icon size={24} />}
        <h5 className={styles.featuresCardTitle} >{title}</h5>
      </div>

      <p className={styles.featuresCardDescription}>{description}</p>
    </div>
  );
};

export default FeaturesCard;
