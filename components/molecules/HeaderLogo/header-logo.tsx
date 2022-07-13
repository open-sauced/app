import React from "react";
import { Typography } from "@supabase/ui";
import Image from "next/image";
import openSaucedImg from "../../../public/openSauced-icon.png";

const HeaderLogo: React.FC = () => {
    
  const { Text } = Typography;

  return (
    <div className="flex items-center p-2">
      <Image className="rounded" alt="Open Sauced Logo" width={32} height={32} src={openSaucedImg} />
      <Text className="font-semibold px-2 text-[16px] !text-white" strong>OpenSauced</Text>
    </div>
  );
};

export default HeaderLogo;