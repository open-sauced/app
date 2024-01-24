import Link from "next/link";
import React from "react";

interface MenuItemProps {
  title: string;
  icon?: React.ReactNode;
  type?: "repo" | "list";
  url: string;
  isActive?: boolean;
}
const SidebarMenuItem = ({ title, icon, type, url: href, isActive }: MenuItemProps) => {
  return (
    <li
      className={
        "py-2 px-3 hover:bg-slate-50 rounded-tr-md rounded-br-md transition-colors" + (isActive ? " bg-slate-100" : "")
      }
    >
      <Link title={title} href={href} className="items-center flex-auto flex-row align-middle block">
        {icon}
        <span className="whitespace-nowrap overflow-hidden overflow-ellipsis inline-flex">{title}</span>
      </Link>
    </li>
  );
};

export default SidebarMenuItem;
