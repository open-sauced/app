import * as Collapsible from "@radix-ui/react-collapsible";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { Root, Thumb } from "@radix-ui/react-switch";
import { useState } from "react";
import ClientOnly from "components/atoms/ClientOnly/client-only";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import SidebarMenuItem from "./sidebar-menu-item";

interface InsightsPanelProps {
  title: string;
  username: string | null;
  insights: DbUserList[] | DbUserInsight[];
  type: "repo" | "list";
  isLoading: boolean;
}

const Loading = () => {
  return (
    <ul className="list-none w-full px-2 mt-1 [&_li]:border-l-2">
      {new Array(5).fill(0).map((_, i) => {
        return (
          <li key={i} className="p-2">
            <SkeletonWrapper height={20} />
          </li>
        );
      })}
    </ul>
  );
};

export const InsightsPanel = ({ title, username, insights, type, isLoading }: InsightsPanelProps) => {
  const [open, setOpen] = useState(true);
  return (
    <Collapsible.Root open={open} onOpenChange={setOpen} className="max-w-full overflow-x-hidden">
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
            <h3 className="uppercase text-gray-500 text-sm font-medium flex gap-1 items-center">
              <span>{title}</span>
              <ClientOnly>
                {open ? (
                  <FiChevronDown className="w-4 h-4" title={`close ${title} panel`} />
                ) : (
                  <FiChevronUp className="w-4 h-4" title={`open ${title} panel`} />
                )}
              </ClientOnly>
            </h3>
          </Thumb>
        </Root>
      </Collapsible.Trigger>
      <Collapsible.Content>
        {isLoading ? (
          <Loading />
        ) : (
          <ul className="list-none w-full px-2 mt-1 [&_li]:border-l-2">
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
