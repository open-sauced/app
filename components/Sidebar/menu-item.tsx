import Link from "next/link";
import React from "react";
import { UsersIcon, ChartBarSquareIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

interface MenuItemProps {
  title: string;
  icon?: React.ReactNode;
  type?: "repo" | "list";
  href: string;
  isActive?: boolean;
}
const MenuItem = ({ title, icon, type, href, isActive }: MenuItemProps) => {
  const getIcon = (type: "repo" | "list") => {
    switch (type) {
      case "list":
        return <UsersIcon className="w-5 h-5 text-slate-400" />;
      case "repo":
        return <ChartBarSquareIcon className="w-5 h-5 text-slate-400" />;
    }
  };
  return (
    <li className={clsx("list-none p-2 rounded-md", isActive ? "bg-slate-100" : "")}>
      <Link href={href} className="flex gap-3 items-center ">
        {type && !icon ? getIcon(type) : icon}
        <span className="text-slate-700">{title}</span>
      </Link>
    </li>
  );
};

export default MenuItem;
