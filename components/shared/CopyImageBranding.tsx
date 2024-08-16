import Image from "next/image";
import openSaucedImg from "img/openSauced-icon.png";

export const CopyImageBranding = () => {
  return (
    <>
      <Image
        className="absolute bottom-2 invisible"
        alt=""
        width={24}
        height={24}
        src={openSaucedImg}
        aria-hidden="true"
        style={{ right: "112px" }}
        data-copy-image-branding
      />
      <p className="font-semibold text-black absolute bottom-4 right-3 invisible" data-copy-image-branding>
        OpenSauced
      </p>
    </>
  );
};
