import React from "react";
import { Menu } from "@headlessui/react";

interface DropdownListProps {
  children: React.ReactNode;
}

const DropdownList: React.FC<DropdownListProps> = ({ children }) => (
  <Menu as="div" className="relative inline-block text-left">
    <Menu.Button>
      {children}
    </Menu.Button>
    <Menu.Items className="absolute right-0 w-56 origin-top-right rounded-md shadow-lg shadow-gray-700/80 border-gray-700 border-2 focus:outline-none px-1 py-1 bg-darkestGrey text-sm font-semibold">
      <Menu.Item>
        <span className="block px-4 py-2 rounded-md text-gray-200 cursor-pointer">
          Logout
        </span>
      </Menu.Item>
    </Menu.Items>
  </Menu>
);

export default DropdownList;