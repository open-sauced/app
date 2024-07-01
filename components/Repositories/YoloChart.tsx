import * as HoverCard from "@radix-ui/react-hover-card";
import Link from "next/link";
import { FaArrowLeft, FaRegHandPeace } from "react-icons/fa6";
import Skeleton from "react-loading-skeleton";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import Card from "components/atoms/Card/card";
import Avatar from "components/atoms/Avatar/avatar";
import HoverCardWrapper from "components/molecules/HoverCardWrapper/hover-card-wrapper";
import { getAvatarByUsername } from "lib/utils/github";
import Button from "components/shared/Button/button";

type YoloChartProps = {
  yoloStats: RepositoryYolo | undefined;
  uniqueYoloCoders: Set<string> | undefined;
  repository: string;
  isLoading: boolean;
  range: number;
  backButtonOnClick?: () => void;
  showHoverCards?: boolean;
  className?: string;
};

export default function YoloChart({
  yoloStats,
  uniqueYoloCoders,
  repository,
  isLoading,
  range,
  backButtonOnClick,
  showHoverCards,
  className,
}: YoloChartProps) {
  return (
    <Card className={`${className ?? ""} flex flex-col gap-4 w-full h-full items-center`}>
      <div className="flex flex-col gap-2 items-start w-full">
        {backButtonOnClick && (
          <Button variant="text" onClick={backButtonOnClick} className="flex gap-2 text-sauced-orange">
            <FaArrowLeft /> Back
          </Button>
        )}
        <section className="flex flex-col lg:flex-row w-full items-start lg:items-center gap-4 lg:justify-between px-4">
          <header className="flex w-full justify-between items-center">
            <div className="flex gap-2 items-center">
              <FaRegHandPeace className="text-xl" />
              <h3 className="text-sm font-semibold xl:text-lg text-slate-800">Lottery Factor</h3>
            </div>
          </header>
        </section>
      </div>

      <section className="w-full px-4 flex flex-col gap-4 text-xs xl:text-sm">
        {isLoading ? (
          <Skeleton height={32} />
        ) : (
          <p className="text-slate-500">
            {uniqueYoloCoders && (
              <>
                <span className="font-semibold text-black">{`${uniqueYoloCoders.size} `}</span> contributor
                {uniqueYoloCoders.size > 1 && "s"} {uniqueYoloCoders.size > 1 ? "have" : "has"} pushed{" "}
                <span className="font-semibold text-black">{yoloStats?.num_yolo_pushed_commits} commits </span>
                directly to the main branch in the last <span className="font-semibold text-black">{range}</span> days.
              </>
            )}
          </p>
        )}

        <p>
          <a href="https://docs.opensauced.pizza" target="_blank" className="text-sauced-orange underline">
            Learn more
          </a>{" "}
          about why this could be a problem.
        </p>
      </section>

      {isLoading ? (
        <div className="flex flex-col w-full gap-4 px-4">
          <SkeletonWrapper count={4} height={32} />
        </div>
      ) : null}

      {!isLoading && yoloStats ? (
        <table className="table-fixed divide-y text-xs xl:text-sm text-slate-500 w-full px-4 border-separate border-spacing-y-2">
          <thead>
            <tr>
              <th className="font-normal text-start">Contributor</th>
              <th className="font-normal text-end w-fit">Sha</th>
              <th className="font-normal text-end">Pushed</th>
            </tr>
          </thead>
          <tbody className="!text-small truncate [&_tr_td]:border-b-1">
            {yoloStats.data.map(({ actor_login, sha, push_num_commits }) => (
              <tr key={actor_login} className="grow items-start">
                <td className="pt-1 pb-2 pl-2">
                  {/*
                    Temporarily copying the DevProfile JSX minus the desktop view to fix this issue https://github.com/open-sauced/app/pull/3373#issuecomment-2112399608
                  */}
                  <div className="flex items-center gap-2 text-light-slate-11">
                    {showHoverCards ? (
                      <HoverCard.Root>
                        <Link href={`/u/${actor_login}`} className="rounded-full">
                          <HoverCard.Trigger>
                            <Avatar
                              size={24}
                              className="xl:w-9 xl:h-9"
                              isCircle
                              hasBorder={false}
                              avatarURL={getAvatarByUsername(actor_login)}
                            />
                          </HoverCard.Trigger>
                        </Link>
                        <HoverCard.Portal>
                          <HoverCard.Content sideOffset={5}>
                            <HoverCardWrapper username={actor_login} />
                          </HoverCard.Content>
                        </HoverCard.Portal>
                      </HoverCard.Root>
                    ) : (
                      <Link href={`/u/${actor_login}`} className="rounded-full">
                        <Avatar
                          size={24}
                          className="xl:w-9 xl:h-9"
                          isCircle
                          hasBorder={false}
                          avatarURL={getAvatarByUsername(actor_login)}
                        />
                      </Link>
                    )}
                    <div>
                      <h1 className="truncate text-light-slate-12">{actor_login}</h1>
                    </div>
                  </div>
                </td>
                <td className="text-end w-fit underline">
                  <a href={`https://github.com/${repository}/commit/${sha}`}>{sha.substring(0, 7)}</a>
                </td>
                <td className="text-end pt-1 pb-2 pr-2">
                  {push_num_commits} commit{push_num_commits > 1 && "s"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </Card>
  );
}
