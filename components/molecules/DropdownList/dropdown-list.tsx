import React from "react";
import { Menu } from "@headlessui/react";

interface DropdownListProps {
  children: React.ReactNode;
  menuContent: JSX.Element;
  className?: string;
  menuContentClassName?: string;
  menuButtonClassName?: string;
}

const DropdownList: React.FC<DropdownListProps> = ({ children, menuContent, className, menuContentClassName, menuButtonClassName }) => (
  <Menu as="div" className={`${className && className} relative inline-block text-left`}>
    <Menu.Button className={`${menuButtonClassName && menuButtonClassName}`}>
      {children}
    </Menu.Button>
    <Menu.Items className={`${menuContentClassName && menuContentClassName} z-10 bg-white absolute right-0 w-56 origin-top-right rounded-md shadow-lg shadow-gray-700/80 border-gray-700 border-2 focus:outline-none px-1 py-1 bg-darkestGrey text-sm font-semibold`}>
      <Menu.Item>
        {menuContent}
      </Menu.Item>
    </Menu.Items>
  </Menu>
);

export default DropdownList;