import type { LucideIcon } from "lucide-react";

type FeaturesCardProps = {
  title: string;
  description: string;
  Icon: LucideIcon;
};

const FeaturesCard = ({ title, description, Icon }: FeaturesCardProps) => {
  return (
    <li className="flex justify-center items-center p-8 flex-col gap-4 bg-[var(--featcard-bg-color)] border-2 border-[var(--featcard-border-color)]  shadow-[var(--featcard-shadow-color)] hover:border-[var(--featcard-border-hover)] hover:shadow-[var(--featcard-shadow-hover)] focus:border-var(--featcard-border-hover)] focus:shadow-[var(--featcard-shadow-hover)] rounded-2xl  transition-all duration-300 ease-in-out ">
      <div className="flex items-center justify-between w-full p-4 text-[var(--featcard-title-color)]  font-(family-name:--featcard-title-font) text-4xl">
        {<Icon size={24} />}

        <h5>{title}</h5>
      </div>

      <p className="p-5 text-xl text-[var(--featcard-description-color)] font-(family-name:--featcard-description-font)">{description}</p>
    </li>
  );
};

export default FeaturesCard;
