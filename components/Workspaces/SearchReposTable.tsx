import { BiBarChartAlt2 } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import { useState } from "react";
import Button from "components/atoms/Button/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "components/shared/Table";
import { Avatar } from "components/atoms/Avatar/avatar-hover-card";
import Checkbox from "components/atoms/Checkbox/checkbox";
import Search from "components/atoms/Search/search";

interface SearchedReposTableProps {
  repositories: {
    owner: string;
    name: string;
  }[];
  onFilter: () => void;
  onSelect: () => void;
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

export const SearchedReposTable = ({
  repositories = [],
  onFilter,
  onSelect: onSelectRepo,
}: SearchedReposTableProps) => {
  const [filteredRepositories, setFilteredRepositories] = useState(repositories);

  return (
    <div className="border border-light-slate-7 rounded-lg">
      <Table className="not-sr-only">
        <TableHeader>
          <TableRow className="bg-light-slate-3">
            <TableHead className="flex justify-between items-center">
              Selected repositories
              <form role="search">
                <Search
                  placeholder="Filter repositories"
                  className="w-full"
                  name="query"
                  onChange={(search) => {
                    setFilteredRepositories(
                      repositories.filter((repo) => {
                        return `${repo.owner}/${repo.name}`.includes(search);
                      })
                    );
                  }}
                  onSearch={onFilter}
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
            {filteredRepositories.map((repo) => {
              const fullRepoName = `${repo.owner}/${repo.name}`;

              return (
                <TableRow key={fullRepoName}>
                  <TableCell className="flex gap-2 items-center w-full">
                    <label className="flex items-center gap-2">
                      <Checkbox onChange={onSelectRepo} />
                      <Avatar contributor={repo.owner} size="xsmall" />
                      <span>{fullRepoName}</span>
                    </label>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
