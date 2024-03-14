import { SquareFillIcon } from "@primer/octicons-react";
import { FaEdit } from "react-icons/fa";
import Button from "components/atoms/Button/button";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";

interface WorkspaceHeaderProps {
  workspace: Workspace;
}

export const WorkspaceHeader = ({ workspace }: WorkspaceHeaderProps) => {
  const { userId } = useSupabaseAuth();
  const isOwner =
    userId && workspace.members.find((member) => Number(member.user_id) === Number(userId) && member.role === "owner");

  return (
    <section className="w-full grid lg:grid-cols-[1fr,auto] gap-2">
      <h1 className="flex gap-2 items-center text-2xl md:text-3xl font-semibold w-max max-w-[20ch] sm:max-w-[35ch] lg:max-w-2xl xl:max-w-4xl">
        {/* putting a square icon here as a placeholder until we implement workspace logos */}
        <SquareFillIcon className="w-12 h-12 text-sauced-orange" />
        <span title={workspace.name} className="truncate">
          {workspace.name}
        </span>
      </h1>
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
    </section>
  );
};
