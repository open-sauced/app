export const StarSearchLoader = () => {
  return (
    <div
      role="progressbar"
      aria-label="Loading..."
      className="flex items-center justify-center space-x-2 bg-transparent bg-white dark:invert h-fit w-max"
    >
      <div className="h-2 w-2 bg-sauced-orange bg-opacity-50 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-2 w-2 bg-sauced-orange bg-opacity-50 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-2 h-2 bg-opacity-50 rounded-full bg-sauced-orange animate-bounce"></div>
    </div>
  );
};
