import { SquareFillIcon } from "@primer/octicons-react";
import { FaEdit } from "react-icons/fa";
import Button from "components/atoms/Button/button";

interface WorkspaceHeaderProps {
  workspace: Workspace;
}

export const WorkspaceHeader = ({ workspace }: WorkspaceHeaderProps) => {
  return (
    <section className="w-full grid grid-cols-[1fr,auto] gap-2">
      <h1 className="flex gap-2 items-center uppercase text-3xl font-semibold w-max max-w-sxs md:max-w-sm lg:max-w-2xl xl:max-w-4xl">
        {/* putting a square icon here as a placeholder until we implement workspace logos */}
        <SquareFillIcon className="w-12 h-12 text-sauced-orange" />
        <span title={workspace.name} className="truncate">
          {workspace.name}
        </span>
      </h1>
      <Button
        variant="primary"
        href={`/workspaces/${workspace.id}/settings`}
        className="my-auto gap-2 items-center shrink-0"
      >
        <FaEdit />
        Edit
      </Button>
    </section>
  );
};
