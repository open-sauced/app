import Image from "next/image";
import Pizza from "public/Sauce.svg";
interface LoaderProps{
  theme: "dark" | "light"
}
const Loader = ({theme = "light"}: LoaderProps) : JSX.Element => {
  return (
    <div
      className={`${theme === "dark" ? "bg-[#160E0E]" : "bg-white"} w-full flex justify-center item-center  h-screen`}
    >
      <Image className="animate-pulse" width={62} height={62} src={Pizza} alt="Pizza" />
    </div>
  );
};

export default Loader;
