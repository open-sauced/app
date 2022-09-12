import React from "react";
import Image from "next/image";
import OpenSaucedLogo from "public/openSauced-icon.png";
import Text from "components/atoms/Typography/text";

// icons
import { AiOutlineTwitter } from "react-icons/ai";
import { AiOutlineGithub } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillYoutube } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";
import { FaDev } from "react-icons/fa";

const footerContext = [
  {
    privacy: { url: "", text: "privacy" },
    terms: { url: "", text: "terms" },
    status: { url: "", text: "status" }
  },
  {
    hot: { url: "https://hot.opensauced.pizza", text: "hot.opensauced.pizza" },
    openSauced: { url: "https://opensauced.pizza", text: "opensauced.pizza" }
  },
  {
    socials: [
      { url: "", icon: <AiOutlineTwitter className="text-2xl text-light-slate-9" /> },
      { url: "", icon: <AiOutlineGithub className="text-2xl text-light-slate-9"/> },
      { url: "", icon: <AiFillInstagram className="text-2xl text-light-slate-9"/> },
      { url: "", icon: <AiFillYoutube className="text-2xl text-light-slate-9" /> },
      { url: "", icon: <FaDiscord className="text-2xl text-light-slate-9"/> },
      { url: "", icon: <FaDev className="text-2xl text-light-slate-9"/> }
    ]
  }
];

const Footer = (): JSX.Element => {
  return (
    <footer className="px-6 md:px-16 h-24 w-full bg-white ">
      <div className=" font-medium md:border-t md:py-8 md:items-center md:justify-between md:gap-x-4 flex flex-col gap-y-4 md:flex-row py-2 w-full">
        <div className="text-center justify-center gap-1 flex items-center">
          <Image width={24} height={24} alt="brand logo" src={OpenSaucedLogo} /> <span className="md:hidden font-bold text-light-slate-12 ">OpenSauced</span>
          <Text className="hidden !text-light-slate-9 md:inline-block">
          © 2022 <span className="hidden md:inline-block">OpenSauced</span>
          </Text>
        </div>
        <div className="flex md:mr-[300px] text-light-slate-11 justify-center gap-x-4">
          <a target="_blank" href={footerContext[1].hot?.url} rel="noopener noreferrer">
            {footerContext[1].hot?.text}
          </a>
          <a target="_blank" href={footerContext[1].openSauced?.url} rel="noopener noreferrer">
            {footerContext[1].openSauced?.text}
          </a>
        </div>
        <div className="flex justify-center gap-x-4 right-0">
          <div className=" hidden md:flex items-center border-r pr-4   gap-x-4 text-light-slate-11 text-sm">
            <a href="" target="_blank">{footerContext[0].terms?.text}</a>
            <a href="" target="_blank">{footerContext[0].privacy?.text}</a>
            <a href="" target="_blank">{footerContext[0].status?.text}</a>
          </div>
          {footerContext[2].socials?.map(({ url, icon }, index) => (
            <a target="_blank" href={url} key={index} rel="noopener noreferrer">
              {icon}
            </a>
          ))}
        </div>
        <div className="flex md:hidden md:border-none md:order-2 border-t py-3 pb-4 mt-2 text-sm justify-between">
          <Text className="text-light-slate-9">
          © 2022 <span className="hidden md:inline-block">Open sauced</span>
          </Text>
          <div className="flex items-center gap-x-4 text-light-slate-11 text-sm">
            <a href={footerContext[0].terms?.url} target="_blank" rel="noreferrer">{footerContext[0].terms?.text}</a>
            <a href={footerContext[0].privacy?.url} target="_blank" rel="noreferrer">{footerContext[0].privacy?.text}</a>
            <a href={footerContext[0].status?.url} target="_blank" rel="noreferrer">{footerContext[0].status?.text}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
