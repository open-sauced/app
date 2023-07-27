import Image from "next/image";
import Pizza from "img/Sauce.svg";
interface LoaderProps {
  theme: "dark" | "light";
}
const Loader = ({ theme = "light" }: LoaderProps): JSX.Element => {
  return (
    <main className="flex absolute w-screen h-screen flex-1 flex-col items-center justify-center text-center">
      <div
        className={`${
          theme === "dark" ? "bg-[#160E0E]" : "bg-white"
        } w-full flex justify-center items-center  h-screen`}
      >
        <div className="absolute flex justify-center items-center">
          <Image className="" width={62} height={62} src={Pizza} alt="Pizza" priority />
        </div>
        <div className="blur-2xl animate-ping">
          <Image className="" width={62} height={62} src={Pizza} alt="Pizza" priority />
        </div>
      </div>
    </main>
  );
};

export default Loader;
