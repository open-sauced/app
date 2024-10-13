import { CheckedState } from "@radix-ui/react-checkbox";
import { BiBarChartAlt2 } from "react-icons/bi";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "components/shared/Table";
import { Avatar } from "components/atoms/Avatar/avatar-hover-card";
import Checkbox from "components/atoms/Checkbox/checkbox";
import Search from "components/atoms/Search/search";

interface SearchedReposTableProps {
  type: "by-repos" | "by-org";
  repositories: Map<string, boolean>;
  onFilter: (filterTerm: string) => void;
  onToggleRepo: (repo: string, checked: boolean) => void;
  onToggleAllRepos: (checked: boolean) => void;
  message?: string;
}

const EmptyState = ({ message }: { message: string }) => {
  return (
    <TableRow>
      <TableCell className="grid place-content-center">
        <div className="grid place-content-center gap-5 my-8">
          <BiBarChartAlt2 className="border rounded-lg p-2 w-11 h-11 mx-auto fill-slate-600 shadow-xs" />
          <div className="grid w-max max-w-sm mx-auto">
            <span className="text-center font-medium mb-2">{message}</span>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
};

export const SearchedReposTable = ({
  type,
  repositories = new Map(),
  onFilter,
  onToggleRepo,
  onToggleAllRepos,
  message = "No repositories found",
}: SearchedReposTableProps) => {
  const allChecked = [...repositories.values()].every((checked) => checked);
  const rows = [...repositories.entries()];

  return (
    <div className="border border-light-slate-7 rounded-lg">
      <Table className="not-sr-only">
        <TableHeader>
          <TableRow className="bg-light-slate-3">
            <TableHead className="flex justify-between items-center gap-6">
              <div className="flex gap-2">
                <Checkbox
                  onCheckedChange={(checked: CheckedState) => {
                    onToggleAllRepos(!!checked);
                  }}
                  checked={allChecked}
                  label={type === "by-repos" ? "Selected repositories" : "Selected organization repositories"}
                />
              </div>
              <form
                className="pr-2"
                role="search"
                onSubmit={(event) => {
                  event.preventDefault;
                }}
              >
                <Search
                  placeholder="Filter repositories"
                  labelText="Filter repositories from the list"
                  className="w-full"
                  name="query"
                  onChange={onFilter}
                />
              </form>
            </TableHead>
          </TableRow>
        </TableHeader>
      </Table>
      <div className="overflow-y-scroll h-60">
        <Table>
          <TableHeader className="sr-only">
            <TableRow className=" bg-light-slate-3">
              <TableHead>Selected repositories</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length > 0 ? (
              <>
                {rows.map(([repo, checked]) => {
                  const [owner] = repo.split("/");

                  return (
                    <TableRow key={repo}>
                      <TableCell className="flex gap-2 items-center w-full">
                        <label className="flex items-center gap-2">
                          <Checkbox
                            onCheckedChange={(checked: CheckedState) => {
                              onToggleRepo(repo, !!checked);
                            }}
                            checked={checked}
                          />
                          <Avatar contributor={owner} size="xsmall" />
                          <span>{repo}</span>
                        </label>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </>
            ) : (
              <EmptyState message={message} />
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
