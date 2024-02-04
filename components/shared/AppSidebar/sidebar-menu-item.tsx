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
    <Link
      title={title}
      href={href}
      className="hover:bg-slate-100 text-sm font-medium flex gap-1 items-center rounded-md transition-colors cursor-pointer tracking-tight py-1 px-2 group"
    >
      {icon}
      <h3 className="py-1 text-slate-800">{title}</h3>
    </Link>
  );
};

export default SidebarMenuItem;
