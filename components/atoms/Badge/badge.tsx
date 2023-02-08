interface BadgeProps {
  text: string;
  className?: string;
}
const Badge = ({ text, className }: BadgeProps): JSX.Element => {
  return (
    <div
      className={`text-light-orange-9 item-center inline-flex justify-center text-sm px-3 rounded-2xl h-6 bg-light-orange-3 w-max py-0.5 ${
        className || ""
      }`}
    >
      {text}
    </div>
  );
};

export default Badge;
