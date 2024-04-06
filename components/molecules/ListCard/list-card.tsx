import React from "react";
import Link from "next/link";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { User } from "@supabase/supabase-js";
import Text from "components/atoms/Typography/text";
import { useFetchListContributors } from "lib/hooks/useList";
import Card from "components/atoms/Card/card";
import StackedAvatar, { Contributor } from "../StackedAvatar/stacked-avatar";

interface ListCardProps {
  list: DbUserList;
  handleOnDeleteClick?: (listName: string, listId: string) => void;
  workspaceId?: string;
  user: User | null;
}
const ListCard = ({ list, handleOnDeleteClick, workspaceId, user }: ListCardProps) => {
  const { data: contributors, meta } = useFetchListContributors(list.id);

  const contributorsAvatar: Contributor[] = contributors?.map((contributor) => ({
    host_login: contributor.login || contributor.username,
  }));

  return (
    <Card>
      <div className="flex flex-col items-start w-full gap-4 px-4 py-6 bg-white rounded-lg md:items-center md:justify-between md:flex-row lg:px-8 lg:gap-2">
        <div className="flex flex-col flex-1 gap-4 lg:gap-6">
          <div className="flex items-center gap-4 lg:items-center ">
            <div className="w-4 h-4 rounded-full bg-light-orange-10"></div>
            <div className="flex justify-between text-xl text-light-slate-12">
              <Link
                href={
                  workspaceId
                    ? `/workspaces/${workspaceId}/contributor-insights/${list.id}/overview`
                    : `/lists/${list.id}/overview`
                }
              >
                {list.name}
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-end w-full gap-8">
            {/* Contributors section */}
            <div className="flex flex-col items-center flex-1 gap-1 mr-2">
              <span className="text-xs text-light-slate-11">Contributors</span>
              <Text className="flex items-center text-2xl">{meta.itemCount}</Text>
            </div>

            <div className="flex items-center">
              <StackedAvatar contributors={contributorsAvatar} visibleQuantity={6} classNames="scale-125" />
            </div>
            <div className="justify-end flex-1 hidden md:flex">
              {/* Delete button */}
              {handleOnDeleteClick && !!user && (
                <button
                  onClick={() => handleOnDeleteClick(list.name, list.id)}
                  className="inline-block p-3 mr-2 border rounded-lg cursor-pointer bg-light-slate-1"
                  type="button"
                >
                  <RiDeleteBinLine title="Delete List" className="text-lg text-light-slate-10" />
                </button>
              )}
              <Link
                className="inline-block p-3 mr-2 border rounded-lg cursor-pointer bg-light-slate-1"
                href={
                  workspaceId
                    ? `/workspaces/${workspaceId}/contributor-insights/${list.id}/overview`
                    : `/lists/${list.id}/overview`
                }
              >
                <MdOutlineArrowForwardIos title="Go To Insight Page" className="text-lg text-light-slate-10" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ListCard;
