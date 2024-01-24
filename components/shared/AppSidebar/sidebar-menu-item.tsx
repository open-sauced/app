import Link from "next/link";
import React from "react";
import { UsersIcon } from "@heroicons/react/24/solid";
import { ChartBarSquareIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

interface MenuItemProps {
  title: string;
  icon?: React.ReactNode;
  type?: "repo" | "list";
  href: string;
  isActive?: boolean;
}
const SidebarMenuItem = ({ title, icon, type, href, isActive }: MenuItemProps) => {
  const getIcon = (type: "repo" | "list") => {
    switch (type) {
      case "list":
        return <UsersIcon className={clsx("w-5 h-5 text-slate-400", isActive && "text-slate-700")} />;
      case "repo":
        return <ChartBarSquareIcon className={clsx("w-5 h-5 text-slate-400", isActive && "text-slate-700")} />;
    }
  };

  return (
    <li className={clsx("py-2 px-3", isActive ? "bg-slate-100" : "")}>
      <Link href={href} className=" flex gap-2 items-center">
        {type && !icon ? getIcon(type) : icon}
        <span className={clsx("text-slate-700 font-medium", isActive && "text-slate-800")}>{title}</span>
      </Link>
    </li>
  );
};

export default SidebarMenuItem;
