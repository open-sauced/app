export const StarSearchLoader = () => {
  return (
    <div className="flex space-x-2 justify-center items-center bg-white dark:invert bg-transparent h-fit w-max">
      <span className="sr-only">Loading...</span>
      <div className="h-2 w-2 bg-sauced-orange bg-opacity-50 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-2 w-2 bg-sauced-orange bg-opacity-50 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-2 w-2 bg-sauced-orange bg-opacity-50 rounded-full animate-bounce"></div>
    </div>
  );
};
