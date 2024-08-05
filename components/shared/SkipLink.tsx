export const SkipLink = ({ id }: { id: string }) => {
  return (
    <a
      href={`#${id}`}
      className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full underline underline-offset-4 transition-transform duration-300 bg-white outline-light-orange-10 outline-1 p-2 rounded-md focus:top-11"
      style={{
        zIndex: 9999,
      }}
    >
      Skip to main content
    </a>
  );
};
