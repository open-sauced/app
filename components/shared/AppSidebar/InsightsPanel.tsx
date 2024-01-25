import * as Collapsible from "@radix-ui/react-collapsible";
import { FiChevronDown } from "react-icons/fi";
import { Root, Thumb } from "@radix-ui/react-switch";
import { useState } from "react";
import { ChartBarSquareIcon, UsersIcon } from "@heroicons/react/24/outline";
import ClientOnly from "components/atoms/ClientOnly/client-only";
import SidebarMenuItem from "./sidebar-menu-item";

interface InsightsPanelProps {
  title: string;
  username: string | null;
  insights: DbUserList[] | DbUserInsight[];
  type: "repo" | "list";
  isLoading: boolean;
}

export const InsightsPanel = ({ title, username, insights, type, isLoading }: InsightsPanelProps) => {
  const [open, setOpen] = useState(true);
  const getIcon = (type: "repo" | "list") => {
    switch (type) {
      case "list":
        return <UsersIcon className="w-5 h-5 text-slate-400" />;
      case "repo":
        return <ChartBarSquareIcon className="w-5 h-5 text-slate-400" />;
    }
  };
  return (
    <Collapsible.Root open={open} onOpenChange={setOpen} className="max-w-full overflow-x-hidden">
      <Collapsible.Trigger asChild className="w-full">
        <Root
          defaultChecked
          checked={open}
          onClick={() => {
            setOpen(!open);
          }}
          name={`${title}-toggle`}
        >
          <Thumb>
            <h3 className="font-medium text-sm flex gap-1 items-center py-2 px-2 hover:bg-slate-100 rounded-md">
              {getIcon(type)}
              <span>{title}</span>
              <ClientOnly>
                <FiChevronDown
                  className={"w-4 h-4 ml-auto transition-all" + (open ? " rotate-180" : "")}
                  title={`close ${title} panel`}
                />
              </ClientOnly>
            </h3>
          </Thumb>
        </Root>
      </Collapsible.Trigger>
      <Collapsible.Content className="CollapsibleContent">
        {isLoading ? null : (
          <ul className="list-none w-full px-4 mt-1 [&_li]:border-l-2">
            {insights.map((insight) => {
              const url = type === "list" ? `/lists/${insight.id}` : `/pages/${username}/${insight.id}/dashboard`;
              return <SidebarMenuItem key={insight.id} title={insight.name} url={url} type={type} />;
            })}
          </ul>
        )}
      </Collapsible.Content>
    </Collapsible.Root>
  );
};
