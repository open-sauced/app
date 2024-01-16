import { BiBarChartAlt2 } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import Button from "components/atoms/Button/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "components/shared/Table";
import { Avatar } from "components/atoms/Avatar/avatar-hover-card";

interface TrackedReposTableProps {
  repositories: {
    owner: string;
    name: string;
  }[];
  onAddRepos: () => void;
  onRemoveTrackedRepo: () => void;
}

const EmptyState = ({ onAddRepos }: { onAddRepos: () => void }) => {
  return (
    <div className="grid place-content-center gap-4 my-8">
      <BiBarChartAlt2 className="border rounded p-1 w-12 h-12 mx-auto" />
      <div className="grid w-max max-w-sm mx-auto">
        <span className="text-center text-lg font-semibold mb-2">Add repositories to track</span>
        <p className="text-sm text-center">
          Search and select the repositories you want to track and get insights on your entire Github ecosystem
        </p>
      </div>
      <Button variant="primary" className="w-max mx-auto" onClick={onAddRepos}>
        <FaPlus className="mr-2 text-lg" />
        Add repositories
      </Button>
    </div>
  );
};

export const TrackedReposTable = ({ repositories, onAddRepos, onRemoveTrackedRepo }: TrackedReposTableProps) => {
  return (
    <div className="grid gap-4">
      <div className="flex justify-between">
        <div>
          <h2 className="flex gap-1 semi-bold text-lg mb-2">
            Repositories Tracked<span className="text-red-900">*</span>
          </h2>
          <p className="text-sm">Select the organizations or repositories you want to track</p>
        </div>
        <Button variant="primary" className="w-max h-max" onClick={onAddRepos}>
          <FaPlus className="mr-2 text-lg" />
          Add repositories
        </Button>
      </div>
      <div className="border border-light-slate-7 rounded">
        <Table className="not-sr-only">
          <TableHeader>
            <TableRow className=" bg-light-slate-3">
              <TableHead>Name</TableHead>
              <TableHead className="w-2">
                <span className="sr-only">Delete</span>
              </TableHead>
            </TableRow>
          </TableHeader>
        </Table>
        {repositories.length > 0 ? (
          <div className="overflow-y-scroll h-60">
            <Table>
              <TableHeader className="sr-only">
                <TableRow className=" bg-light-slate-3">
                  <TableHead>Name</TableHead>
                  <TableHead className="w-4">
                    <span className="sr-only">Delete</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {repositories.map((repo) => {
                  const fullRepoName = `${repo.owner}/${repo.name}`;

                  return (
                    <TableRow key={fullRepoName}>
                      <TableCell className="flex gap-2 items-center w-full">
                        <Avatar contributor={repo.owner} size="xsmall" />
                        <span>{fullRepoName}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        <button onClick={onRemoveTrackedRepo}>
                          <FaTrashAlt title="delete" className="text-light-slate-10" />
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        ) : (
          <EmptyState onAddRepos={onAddRepos} />
        )}
      </div>
    </div>
  );
};
