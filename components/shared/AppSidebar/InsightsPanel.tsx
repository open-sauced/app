import * as Collapsible from "@radix-ui/react-collapsible";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { Root, Thumb } from "@radix-ui/react-switch";
import { useState } from "react";
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
  return (
    <Collapsible.Root open={open} onOpenChange={setOpen} className="max-w-full overflow-x-hidden">
      <h3 className="uppercase text-gray-500 text-sm font-medium flex gap-1 items-center">
        <span>{title}</span>
        <Collapsible.Trigger asChild>
          <Root
            defaultChecked
            checked={open}
            onClick={() => {
              setOpen(!open);
            }}
            name={`${title}-toggle`}
          >
            <Thumb>
              <ClientOnly>
                {open ? (
                  <FiChevronDown className="w-4 h-4" title={`close ${title} panel`} />
                ) : (
                  <FiChevronUp className="w-4 h-4" title={`open ${title} panel`} />
                )}
              </ClientOnly>
            </Thumb>
          </Root>
        </Collapsible.Trigger>
      </h3>
      <Collapsible.Content>
        {isLoading ? null : (
          <ul className="list-none w-full px-2 mt-1 [&_li]:border-l-2">
            {insights.map((insight) => {
              const url = type === "list" ? `/lists/${insight.id}` : `/pages/${username}/${insight.id}/dashboard`;
              return <SidebarMenuItem key={insight.id} title={insight.name} href={url} type={type} />;
            })}
          </ul>
        )}
      </Collapsible.Content>
    </Collapsible.Root>
  );
};
