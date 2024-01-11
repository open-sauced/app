import React from "react";

import { LifebuoyIcon, Cog8ToothIcon } from "@heroicons/react/24/outline";
import SidebarMenuItem from "./sidebar-menu-item";

interface SidebarProps {
  children: React.ReactNode;
}

const SidebarWrapper = ({ children }: SidebarProps) => {
  return (
    <div className="bg-white flex flex-col gap-8 w-full max-w-xs px-3  min-h-[calc(100vh-150px)] max-h-screen justify-between">
      <div className="grid gap-4 mt-4">{children}</div>
      <div className="mb-4">
        <SidebarMenuItem title="Support" href="/logout" icon={<LifebuoyIcon className="w-5 h-5 text-slate-400" />} />
        <SidebarMenuItem
          title="Settings"
          href="/user/settings"
          icon={<Cog8ToothIcon className="w-5 h-5 text-slate-400" />}
        />
      </div>
    </div>
  );
};

export default SidebarWrapper;
