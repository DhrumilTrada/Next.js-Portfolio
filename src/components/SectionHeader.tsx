export const SectionHeader = ({
  title,
  eyebrow,
  description,
}: {
  title: string;
  eyebrow: string;
  description: string;
}) => {
  return (
    <>
      <div className="flex justify-center">
        <p className="uppercase font-semibold tracking-widest bg-gradient-to-tr from-emerald-300 to-sky-400 bg-clip-text text-transparent text-center">
          {eyebrow}
        </p>
      </div>
      <h2 className="font-serif md:text-5xl text-3xl text-center mt-6">
        {title}
      </h2>
      <p className="text-center text-white/60 md:text-lg lg:text-xl max-w-md mx-auto mt-4">
        {description}
      </p>
    </>
  );
};
