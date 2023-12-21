import React from "react";
import Title from "components/atoms/Typography/title";

interface MenuHeaderProps {
  children: React.ReactNode;
}
const SidebarMenuHeader = ({ children }: MenuHeaderProps) => {
  return (
    <Title className="text-gray-500 text-sm px-2" level={3}>
      {children}
    </Title>
  );
};

export default SidebarMenuHeader;
