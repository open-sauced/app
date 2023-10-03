import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { FiCopy } from "react-icons/fi";
import { usePostHog } from "posthog-js/react";

import Button from "components/atoms/Button/button";
import Title from "components/atoms/Typography/title";
import Badge from "components/atoms/InsightBadge/insight-badge";
import ContextThumbnail from "components/atoms/ContextThumbnail/context-thumbnail";

import { truncateString } from "lib/utils/truncate-string";
import { useToast } from "lib/hooks/useToast";

interface ListHeaderProps {
  name: string;
  listId: string;
  isPublic: boolean;
  isOwner: boolean;
  numberOfContributors: number;
}

const ListHeader = ({ name, isPublic, listId, isOwner, numberOfContributors }: ListHeaderProps): JSX.Element => {
  const { toast } = useToast();
  const posthog = usePostHog();

  const handleCopyToClipboard = async () => {
    const url = new URL(window.location.href).toString();
    posthog!.capture("clicked: Lists copied");

    try {
      await navigator.clipboard.writeText(url);
      toast({ description: "Copied to clipboard", variant: "success" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative flex flex-row justify-between w-full">
      <div className="flex flex-col md:flex-row ">
        <div className="header-image mr-2 p-2 min-w-[130px]">
          <ContextThumbnail size={120} ContextThumbnailURL={""}></ContextThumbnail>
        </div>
        <div className="flex flex-col justify-center p-2 header-info grow">
          <div className="flex gap-2">
            <Title level={1} className="!text-2xl font-semibold tracking-tight text-slate-900">
              {(name && truncateString(name, 30)) || "List"}
            </Title>
            {<Badge isPublic={isPublic} />}
          </div>
          <div className="flex items-center gap-2 mt-4" id="contributorCount">
            {numberOfContributors} Contributors
          </div>
        </div>
      </div>
      <div className="absolute right-0 flex flex-col gap-3 py-2 md:items-center md:flex-row md:static">
        <Button onClick={() => handleCopyToClipboard()} className="px-6 py-2 bg-white " variant="text">
          <FiCopy className="mt-1 mr-2" /> Share
        </Button>
        {isOwner && (
          <Link href={`/hub/lists/${listId}/edit`}>
            <Button className="text-xs" variant="primary">
              <FaEdit className="mr-2" /> Edit List
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ListHeader;
