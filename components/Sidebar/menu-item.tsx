import Link from "next/link";
import React from "react";
import { UsersIcon, ChartBarSquareIcon } from "@heroicons/react/24/solid";

interface MenuItemProps {
  title: string;
  icon?: React.ReactNode;
  type?: "repo" | "list";
  href: string;
  active?: boolean;
}
const MenuItem = ({ title, icon, type, href, active }: MenuItemProps) => {
  const getIcon = (type: "repo" | "list") => {
    switch (type) {
      case "list":
        return <UsersIcon className="w-5 h-5" />;
      case "repo":
        return <ChartBarSquareIcon className="w-5 h-5" />;
    }
  };
  return (
    <li className="list-none">
      <Link href="/dashboard" className="flex gap-3 items-center ">
        {type && !icon ? getIcon(type) : icon}
        <span>{title}</span>
      </Link>
    </li>
  );
};

export default MenuItem;
