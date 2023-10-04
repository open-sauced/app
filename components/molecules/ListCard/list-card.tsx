import React from "react";
import Link from "next/link";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import Text from "components/atoms/Typography/text";
import Tooltip from "components/atoms/Tooltip/tooltip";
import { useFetchListContributors } from "lib/hooks/useList";
import StackedAvatar, { Contributor } from "../StackedAvatar/stacked-avatar";

interface ListCardProps {
  list: DbUserList;
  handleOnDeleteClick: (listName: string, listId: string) => void;
}
const ListCard = ({ list, handleOnDeleteClick }: ListCardProps) => {
  const { data: contributors, meta } = useFetchListContributors(list.id);

  const contributorsAvatar: Contributor[] = contributors?.map((contributor) => ({
    host_login: contributor.login,
  }));

  return (
    <div>
      <div className="flex flex-col items-start w-full gap-4 px-4 py-6 bg-white rounded-lg md:items-center md:justify-between md:flex-row lg:px-8 lg:gap-2">
        <div className="flex flex-col flex-1 gap-4 lg:gap-6">
          <div className="flex items-center gap-4 lg:items-center ">
            <div className="w-4 h-4 rounded-full bg-light-orange-10"></div>
            <div className="flex justify-between text-xl text-light-slate-12">
              <Link href={`/lists/${list.id}/overview`}>{list.name}</Link>
            </div>
            <div className="px-2 border rounded-2xl text-light-slate-11">{!!list.is_public ? "public" : "private"}</div>
          </div>
        </div>
        <div className="">
          <div className="flex items-center justify-end w-full gap-8">
            {/* Contributors section */}
            <div className="flex flex-col items-center flex-1 gap-1 mr-2">
              <span className="text-xs text-light-slate-11">Contributors</span>
              <Text className="flex items-center text-2xl">{meta.itemCount}</Text>
            </div>

            <div className="flex items-center">
              <StackedAvatar contributors={contributorsAvatar} visibleQuantity={6} classNames="scale-125" />
              <Tooltip content="Add more contributors">
                <button
                  className="z-50 w-8 h-8 overflow-hidden scale-110 bg-white border-2 border-white rounded-full"
                  type="button"
                >
                  <span className="grid w-full h-full place-items-center bg-purple-200/50">
                    <FiPlus className="p-0.5 text-purple-600" />
                  </span>
                </button>
              </Tooltip>
            </div>
            <div className="justify-end flex-1 hidden md:flex">
              {/* Delete button */}
              <button
                onClick={() => handleOnDeleteClick(list.name, list.id)}
                className="inline-block p-3 mr-2 border rounded-lg cursor-pointer bg-light-slate-1"
                type="button"
              >
                <RiDeleteBinLine title="Delete List" className="text-lg text-light-slate-10" />
              </button>
              <Link
                className="inline-block p-3 mr-2 border rounded-lg cursor-pointer bg-light-slate-1"
                href={`/lists/${list.id}/overview`}
              >
                <MdOutlineArrowForwardIos title="Go To Insight Page" className="text-lg text-light-slate-10" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCard;
