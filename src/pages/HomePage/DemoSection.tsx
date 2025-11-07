import { motion } from "framer-motion";
import demo from "../../assets/imgs/Task-Manager.gif"

type DemoSectionProps = {
  title: string;
  subtitle: string;
  figcaption?: string;
  children?: React.ReactNode;
};

const DemoSection = ({ title, subtitle, ...props }: DemoSectionProps) => {
  return (
    <section className="h-dvh w-full flex flex-col items-center justify-center gap-12  py-12 px-10">
      <div className="flex flex-col items-center justify-center gap-8 text-center">
        <motion.h2
          className="p-4 text-[3.2rem]  2xl:text-[4.8rem] font-bold text-center text-[var(--demo-title-font)] text-shadow-[var(--demo-title-shadow)]
            font-(family-name:--demo-title-font) "
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h2>

        <motion.p
          className="p-4 text-[1.4rem]  2xl:text-[1.8rem] font-medium text-[var(--demo-subtitle-color)] font-(family-name:--demo-subtitle-font)"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      </div>

      <motion.figure
        className=" flex flex-col mt-16 relative justify-center items-center gap-4 border-4 rounded-lg border-[var(--demo-figure-border)] shadow-[var(--demo-figure-shadow)]"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
      >
        <img src={demo} alt="task manager demonstration" />
        {props.figcaption && (
          <figcaption className="text-[1.2rem] absolute bottom-16 2xl:text-[1.6rem] text-[var(--demo-figcaption-color)] font-(family-name:--demo-figcaption-font) shadow-[var(--demo-figcaption-shadow)]">
            {props.figcaption}
          </figcaption>
        )}
      </motion.figure>
    </section>
  );
};

export default DemoSection;
