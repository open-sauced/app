import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "components/shared/Table";
import { Avatar } from "components/atoms/Avatar/avatar-hover-card";
import Checkbox from "components/atoms/Checkbox/checkbox";
import Search from "components/atoms/Search/search";

interface SearchedReposTableProps {
  repositories: string[];
  onFilter: (filterTerm: string) => void;
  onSelect: (value: string) => void;
}

export const SearchedReposTable = ({ repositories = [], onFilter, onSelect }: SearchedReposTableProps) => {
  return (
    <div className="border border-light-slate-7 rounded-lg">
      <Table className="not-sr-only">
        <TableHeader>
          <TableRow className="bg-light-slate-3">
            <TableHead className="flex justify-between items-center gap-6">
              Selected repositories
              <form
                role="search"
                onSubmit={(event) => {
                  event.preventDefault;
                }}
              >
                <Search placeholder="Filter repositories" className="w-full" name="query" onChange={onFilter} />
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
            {repositories.map((repo) => {
              const [owner] = repo.split("/");

              return (
                <TableRow key={repo}>
                  <TableCell className="flex gap-2 items-center w-full">
                    <label className="flex items-center gap-2">
                      <Checkbox
                        onChange={(event) => {
                          onSelect("");
                        }}
                        // TODO: handle checked/unchecked
                        checked
                      />
                      <Avatar contributor={owner} size="xsmall" />
                      <span>{repo}</span>
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
