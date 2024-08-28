import { SquareFillIcon } from "@primer/octicons-react";
import { FaEdit } from "react-icons/fa";
import { FiCopy } from "react-icons/fi";
import { usePostHog } from "posthog-js/react";
import Link from "next/link";
import { HiOutlineUsers } from "react-icons/hi2";
import Button from "components/shared/Button/button";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { shortenUrl } from "lib/utils/shorten-url";
import { useToast } from "lib/hooks/useToast";
import Pill from "components/atoms/Pill/pill";
import { writeToClipboard } from "lib/utils/write-to-clipboard";

interface WorkspaceHeaderProps {
  workspace: Workspace;
  children?: React.ReactNode;
  title: string;
  url: string;
}

export const WorkspaceHeader = ({ workspace, children, title, url }: WorkspaceHeaderProps) => {
  const { toast } = useToast();
  const posthog = usePostHog();
  const { userId } = useSupabaseAuth();
  const isOwner =
    userId && workspace.members.find((member) => Number(member.user_id) === Number(userId) && member.role === "owner");

  const copyUrlToClipboard = async () => {
    const url = new URL(window.location.href).toString();
    posthog!.capture("clicked: Workspace share");

    try {
      const shortUrl = await shortenUrl(url);
      writeToClipboard(shortUrl);
      toast({ description: "Copied to clipboard.", variant: "success" });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <section className="w-full grid lg:grid-cols-[1fr,auto] gap-2">
      <h1 className="flex gap-2 items-center text-2xl md:text-3xl font-semibold w-max max-w-[20ch] sm:max-w-[35ch] lg:max-w-2xl xl:max-w-4xl">
        {/* putting a square icon here as a placeholder until we implement workspace logos */}
        <SquareFillIcon className="w-12 h-12 text-sauced-orange" />
        <span title={workspace.name} className="truncate">
          {workspace.name}
        </span>
        <Pill className="font-medium" text={workspace.is_public ? "Public" : "Private"} />
      </h1>
      <div className="flex gap-2 justify-end">
        {children}

        <Link
          href={`/workspaces/${workspace.id}/contributor-insights`}
          className="my-auto gap-2 items-center shrink-0 place-self-end bg-orange-50 text-[#ed5f00]  font-inter font-semibold hover:bg-orange-100 text-[14px] px-4 py-2 rounded-md transition-colors duration-200"
        >
          <span className="flex gap-2 items-center">
            <HiOutlineUsers />
            Contributor insights
          </span>
        </Link>

        <Button
          variant="outline"
          onClick={copyUrlToClipboard}
          className="my-auto gap-2 items-center shrink-0 place-self-end"
        >
          <FiCopy />
          Share
        </Button>
        {isOwner && (
          <Button
            variant="primary"
            href={`/workspaces/${workspace.id}/settings`}
            className="my-auto gap-2 items-center shrink-0 place-self-end"
          >
            <FaEdit />
            Edit
          </Button>
        )}
      </div>
    </section>
  );
};
