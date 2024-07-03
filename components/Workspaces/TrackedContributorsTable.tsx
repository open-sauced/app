import { BiBarChartAlt2 } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { ComponentProps } from "react";
import Button from "components/shared/Button/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "components/shared/Table";
import { Avatar } from "components/atoms/Avatar/avatar-hover-card";
import ClientOnly from "components/atoms/ClientOnly/client-only";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";

interface TrackedContributorsTableProps {
  contributors: Map<string, boolean>;
  onAddContributors: () => void;
  onRemoveTrackedContributor: ComponentProps<"button">["onClick"];
  isLoading?: boolean;
  disabled?: boolean;
}

export const EmptyState = ({ onAddContributors, disabled }: { onAddContributors: () => void; disabled?: boolean }) => {
  return (
    <div className="grid place-content-center gap-5 my-8">
      <BiBarChartAlt2 className="border rounded-lg p-2 w-11 h-11 mx-auto fill-slate-600 shadow-xs" />
      <div className="grid lg:w-max max-w-sm mx-auto px-2">
        <span className="text-center font-medium mb-2">Add contributors to track</span>
        <p className="text-sm text-slate-600 text-center">
          Search and select the contributors you want to track and get insights on your entire GitHub ecosystem
        </p>
      </div>
      <Button variant="primary" className="w-max mx-auto" onClick={onAddContributors} disabled={disabled}>
        <FaPlus className="mr-2 text-lg" />
        Add contributors
      </Button>
    </div>
  );
};

const LoadingState = () => {
  return (
    <>
      {Array.from({ length: 5 }, (_, index) => (
        <TableRow key={index}>
          <TableCell colSpan={2}>
            <SkeletonWrapper key={index} height={22} />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export const TrackedContributorsTable = ({
  contributors,
  onAddContributors,
  onRemoveTrackedContributor,
  isLoading = false,
  disabled = false,
}: TrackedContributorsTableProps) => {
  return (
    <div className="grid gap-4">
      <div className="flex justify-between flex-wrap gap-2">
        <div>
          <h2 className="flex gap-1 font-medium mb-2 text-md">Contributors Tracked</h2>
          <p className="text-sm text-slate-600">Select the contributors you want to track</p>
        </div>
        <Button variant="primary" className="w-max h-max" onClick={onAddContributors} disabled={disabled}>
          <FaPlus className="mr-2 text-lg" />
          Add contributors
        </Button>
      </div>
      <div className="border border-light-slate-7 rounded h-full">
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
        <ClientOnly>
          {contributors.size > 0 || isLoading ? (
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
                  {isLoading ? (
                    <LoadingState />
                  ) : (
                    <>
                      {[...contributors].map(([contributor]) => {
                        return (
                          <TableRow key={contributor}>
                            <TableCell className="flex gap-2 items-center w-full">
                              <Avatar contributor={contributor} size="xsmall" />
                              <span>{contributor}</span>
                            </TableCell>
                            <TableCell className="text-right">
                              <button
                                onClick={onRemoveTrackedContributor}
                                data-contributor={contributor}
                                disabled={disabled}
                              >
                                <FaTrashAlt title="delete" className="text-light-slate-10" />
                              </button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </>
                  )}
                </TableBody>
              </Table>
            </div>
          ) : (
            <EmptyState onAddContributors={onAddContributors} disabled={disabled} />
          )}
        </ClientOnly>
      </div>
    </div>
  );
};
