import React from "react";

import { LifebuoyIcon, Cog8ToothIcon } from "@heroicons/react/24/outline";
import SidebarMenuItem from "./sidebar-menu-item";

interface SidebarProps {
  children: React.ReactNode;
}

const SidebarWrapper = ({ children }: SidebarProps) => {
  return (
    <div className="bg-white relative w-full md:w-1/5 px-2 py-3 flex flex-col gap-8 min-h-[calc(100vh-40px)]">
      {children}
      <div className="absolute flex flex-col bottom-0">
        <SidebarMenuItem title="Support" href="/logout" icon={<LifebuoyIcon className="w-5 h-5 text-slate-400" />} />
        <SidebarMenuItem
          title="Settings"
          href="/settings"
          icon={<Cog8ToothIcon className="w-5 h-5 text-slate-400" />}
        />
      </div>
    </div>
  );
};

export default SidebarWrapper;
