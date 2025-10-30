type DemoSectionProps = {
  title: string;
  subtitle: string;
  figcaption?: string;
  children?: React.ReactNode;
};

const DemoSection = ({ title, subtitle, ...props }: DemoSectionProps) => {
  return (
    <section className="h-dvh w-full flex flex-col items-center justify-center gap-12  py-12 px-10">
      <div className="flex flex-col items-center justify-center gap-8">
        <h2
          className="p-4 text-[3.2rem]  2xl:text-[4.8rem] font-bold text-center text-[var(--demo-title-font)] text-shadow-[var(--demo-title-shadow)]
            font-(family-name:--demo-title-font) "
        >
          {title}
        </h2>

        <p className="p-4 text-[1.4rem]  2xl:text-[1.8rem] font-medium text-[var(--demo-subtitle-color)] font-(family-name:--demo-subtitle-font)">
          {subtitle}
        </p>
      </div>

      <figure className=" flex flex-col relative justify-center items-center gap-4 border-2 border-[var(--demo-figure-border)] shadow-[var(--demo-figure-shadow)]">


        {props.figcaption && (
          <figcaption className="text-[1.2rem] absolute bottom-16 2xl:text-[1.6rem] text-[var(--demo-figcaption-color)] font-(family-name:--demo-figcaption-font) shadow-[var(--demo-figcaption-shadow)]">
            {props.figcaption}
          </figcaption>
        )}
      </figure>
    </section>
  );
};

export default DemoSection;
