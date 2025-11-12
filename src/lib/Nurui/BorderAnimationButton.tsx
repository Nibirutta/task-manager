import type { LucideIcon } from "lucide-react";
import cn from "../utils";

interface BorderAnimationButtonProps {
  text: string;
  className?: string;
  icon?: LucideIcon;
  backgroundColor?: string;
  textColor?: string;
  textFont?: string;
  textSize?: string;
  borderColor1?: string;
  borderColor2?: string;
  borderColor3?: string;
}

const BorderAnimationButton = ({ 
  text, 
  className, 
  icon: Icon,
  backgroundColor = "transparent",
  textColor = "white",
  textFont = "sans-serif",
  textSize = "1.6rem",
  borderColor1 = "#e7029a", 
  borderColor2 = "#f472b6", 
  borderColor3 = "#bd5fff", 
}: BorderAnimationButtonProps) => {
  return (
    <div 
      className={cn("relative inline-flex  active:scale-95 transistion overflow-hidden rounded-lg p-[1px] focus:outline-none", className)}
      style={{
        "--color1": borderColor1,
        "--color2": borderColor2,
        "--color3": borderColor3,
      } as React.CSSProperties}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,var(--color1)_0%,var(--color2)_50%,var(--color3)_100%)]"></span>
      <span 
        className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg p-4 text-sm font-medium backdrop-blur-3xl gap-2"
        style={{
          backgroundColor: backgroundColor,
        color: textColor,
        fontFamily: textFont,
        fontSize: textSize,
        }}
      >
        <p>{text}</p>
        {Icon && <Icon size={18} />}
      </span>
      
    </div>
  );
};

export default BorderAnimationButton;
