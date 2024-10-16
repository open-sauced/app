import { CheckedState } from "@radix-ui/react-checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "components/shared/Table";
import { Avatar } from "components/atoms/Avatar/avatar-hover-card";
import Checkbox from "components/atoms/Checkbox/checkbox";
import Search from "components/atoms/Search/search";

interface SearchedContributorsTableProps {
  type: "by-contributors" | "by-org";
  contributors: Map<string, boolean>;
  onFilter: (filterTerm: string) => void;
  onToggleContributor: (contributor: string, checked: boolean) => void;
  onToggleAllContributors: (checked: boolean) => void;
}

export const SearchedContributorsTable = ({
  type,
  contributors = new Map(),
  onFilter,
  onToggleContributor,
  onToggleAllContributors,
}: SearchedContributorsTableProps) => {
  const allChecked = [...contributors.values()].every((checked) => checked);

  return (
    <div className="border border-light-slate-7 rounded-lg">
      <Table className="not-sr-only">
        <TableHeader>
          <TableRow className="bg-light-slate-3">
            <TableHead className="flex justify-between items-center gap-6">
              <div className="flex gap-2">
                <Checkbox
                  onCheckedChange={(checked: CheckedState) => {
                    onToggleAllContributors(!!checked);
                  }}
                  checked={allChecked}
                  label={type === "by-contributors" ? "Selected contributors" : "Selected organization contributors"}
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
                  placeholder="Filter contributors"
                  labelText="Filter contributors from the list"
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
              <TableHead>Selected contributors</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...contributors.entries()].map(([contributor, checked]) => {
              const [owner] = contributor.split("/");

              return (
                <TableRow key={contributor}>
                  <TableCell className="flex gap-2 items-center w-full">
                    <label className="flex items-center gap-2">
                      <Checkbox
                        onCheckedChange={(checked: CheckedState) => {
                          onToggleContributor(contributor, !!checked);
                        }}
                        checked={checked}
                      />
                      <Avatar contributor={owner} size="xsmall" />
                      <span>{contributor}</span>
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
