type DemoSectionProps = {
  title: string;
  subtitle: string;
  figcaption?: string;
  children?: React.ReactNode;
};

const DemoSection = ({ title, subtitle, ...props }: DemoSectionProps) => {
  return (
    <section className="h-dvh w-full flex flex-col items-center justify-between  py-12 px-10">
      <div className="flex flex-col items-center justify-center gap-8">
        <h2
          className="p-4 text-6xl font-bold text-center text-[var(--demo-title-font)] text-shadow-[var(--demo-title-shadow)]
            font-(family-name:--demo-title-font) "
        >
          {title}
        </h2>

        <p className="p-4 text-4xl font-medium text-[var(--demo-subtitle-color)] font-(family-name:--demo-subtitle-font)">
          {subtitle}
        </p>
      </div>

      <figure className="border-2 border-[var(--demo-figure-border)] shadow-[var(--demo-figure-shadow)]">
        {/* todo: gif do dashboard */}

        {props.figcaption && (
          <figcaption className="text-2xl text-[var(--demo-figcaption-color)] font-(family-name:--demo-figcaption-font)">
            {props.figcaption}
          </figcaption>
        )}
      </figure>
    </section>
  );
};

export default DemoSection;
