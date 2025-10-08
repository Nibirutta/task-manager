
import { motion, useAnimation } from "motion/react";
import { type LucideIcon } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import cn from "../utils";


interface AttractButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  particleCount?: number;
  attractRadius?: number;
  text: string;
  icon?: LucideIcon;
  ballColor?: string;
  backgroundColor?: string;
  textColor?: string;
  textFont?: string;
  textSize?: string;
  stiffness?: number;
  damping?: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
}

export default function MagnetButton({
  className,
  particleCount = 12,
  attractRadius = 150, // Adicionando um valor padrão
  text,
  icon: Icon,
  ballColor = "oklch(70.2% 0.183 293.541)",
  backgroundColor = "transparent",
  textColor = "white",
  textFont = "sans-serif",
  textSize = "1.6rem",
  stiffness =30, // Valor padrão para rigidez
  damping = 10,   // Valor padrão para amortecimento
  ...props
}: AttractButtonProps) {
  const [isAttracting, setIsAttracting] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const particlesControl = useAnimation();

  useEffect(() => {
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * (attractRadius * 2) - attractRadius,
      y: Math.random() * (attractRadius * 2) - attractRadius,
    }));
    setParticles(newParticles);
  }, [particleCount, attractRadius]);

  const handleInteractionStart = useCallback(async () => {
    setIsAttracting(true);
    await particlesControl.start({
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: stiffness,
        damping: damping,
      },
    });
  }, [particlesControl, stiffness, damping]);

  const handleInteractionEnd = useCallback(async () => {
    setIsAttracting(false);
    await particlesControl.start((i) => ({
      x: particles[i].x,
      y: particles[i].y,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    }));
  }, [particlesControl, particles]);

  return (
    <button       style={{
        "--ball-color": ballColor,
        backgroundColor: backgroundColor,
        color: textColor,
        fontFamily: textFont,
        fontSize: textSize,
      } as React.CSSProperties}
      className={cn(
        "min-w-40 relative cursor-pointer flex items-center justify-center gap-2",
        "rounded-2xl p-5 relative  ",
        "transition-all duration-300 ease-in-out  active:scale-95",
        className,
      )}
      onMouseEnter={handleInteractionStart}
      onMouseLeave={handleInteractionEnd}
      onTouchStart={handleInteractionStart}
      onTouchEnd={handleInteractionEnd}
      {...props}
    >
      {particles.map((_, index) => (
        <motion.div
          key={index}
          custom={index}
          initial={{ x: particles[index].x, y: particles[index].y }}
          animate={particlesControl}
          className={cn(
            "absolute w-1.5 h-1.5 rounded-full",
            "bg-[var(--ball-color)] pointer-events-none",
            "transition-opacity z-0 duration-300",
            isAttracting ? "opacity-30" : "opacity-50",
          )}
        />
      ))}
      <span

      className="relative w-full flex  items-center justify-center gap-2">
        {Icon && <Icon size={20} />}
        {text}

      </span>
    </button>
  );
}
