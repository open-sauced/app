import Link from "next/link";
import React from "react";
import { UsersIcon } from "@heroicons/react/24/solid";
import { ChartBarSquareIcon } from "@heroicons/react/24/outline";

interface MenuItemProps {
  title: string;
  icon?: React.ReactNode;
  type?: "repo" | "list";
  href: string;
}
const SidebarMenuItem = ({ title, icon, type, href }: MenuItemProps) => {
  const getIcon = (type: "repo" | "list") => {
    switch (type) {
      case "list":
        return <UsersIcon className="w-5 h-5 text-slate-400" />;
      case "repo":
        return <ChartBarSquareIcon className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <li className="py-2 px-3 whitespace-nowrap overflow-hidden overflow-ellipsis">
      <Link href={href} className=" flex gap-2 items-center">
        {type && !icon ? getIcon(type) : icon}
        <span>{title}</span>
      </Link>
    </li>
  );
};

export default SidebarMenuItem;
