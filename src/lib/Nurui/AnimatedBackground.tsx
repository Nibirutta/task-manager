import { motion } from "framer-motion";
import style from './hero.module.css';

interface AnimatedBackgroundProps {
  line1Color?: string;
  line2Color?: string;
  blob1Color?: string;
  blob2Color?: string;
}

const AnimatedBackground = ({
  line1Color,
  line2Color,
  blob1Color,
  blob2Color,
}: AnimatedBackgroundProps) => {
  return (
    <>
      {/* --- INÍCIO DO BACKGROUND ANIMADO --- */}
     <div className={style.animatedBackgroundContainer} style={{
        '--line-color-1': line1Color,
        '--line-color-2': line2Color,
        '--blob-color-1': blob1Color,
        '--blob-color-2': blob2Color,
     } as React.CSSProperties}>
        {/* Curved Lines */}
        <svg
          className="absolute h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="grad1" x1="1" y1="0" x2="0" y2="0">
              <stop offset="0%" stopColor="var(--line-color-1)" stopOpacity="0" />
              <stop offset="50%" stopColor="var(--line-color-1)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="var(--line-color-1)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="grad2" x1="1" y1="0" x2="0" y2="0">
              <stop offset="0%" stopColor="var(--line-color-2)" stopOpacity="0" />
              <stop offset="50%" stopColor="var(--line-color-2)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="var(--line-color-2)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Top Curves */}
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              repeatDelay: 1,
            }}
            d="M 100 100 Q 300 0 500 100 T 900 100"
            fill="none"
            stroke="url(#grad1)"
            strokeWidth="1"
          />
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              repeatDelay: 1,
              delay: 0.5,
            }}
            d="M 0 200 Q 200 100 400 200 T 800 200"
            fill="none"
            stroke="url(#grad2)"
            strokeWidth="1"
          />
          {/* Bottom Curves */}
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              repeatDelay: 1,
              delay: 1,
            }}
            d="M 100 600 Q 300 500 500 600 T 900 600"
            fill="none"
            stroke="url(#grad1)"
            strokeWidth="1"
          />
        </svg>

        {/* Animated Background Blobs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className={style.blob1}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className={style.blob2}
        />
      </div>
      {/* --- FIM DO BACKGROUND ANIMADO --- */}
    </>
  );
};

export default AnimatedBackground;
