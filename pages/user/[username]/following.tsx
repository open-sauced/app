import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import Link from "next/link";

import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import Title from "components/atoms/Typography/title";
import Button from "components/atoms/Button/button";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import DashContainer from "components/atoms/DashedContainer/DashContainer";
import Avatar from "components/atoms/Avatar/avatar";
import changeCapitalization from "lib/utils/change-capitalization";
import ProfileLayout from "layouts/profile";
import { WithPageLayout } from "interfaces/with-page-layout";

const users = [
  {
    id: 196,
    user_id: 237133,
    following_user_id: 71359796,
    created_at: "2016-10-19 13:24:51.000000",
    updated_at: "2022-08-28 22:04:29.000000",
    bio: "OpenSauced User",
    login: "0-vortex",
    avatar_url: "https://avatars.githubusercontent.com/u/237133?v=4",
    name: "MrPizza",
  },
  {
    id: 197,
    user_id: 237113,
    following_user_id: 71329796,
    created_at: "2016-10-19 13:24:51.000000",
    updated_at: "2022-08-28 22:04:29.000000",
    bio: "OpenSauced User",
    login: "brandon",
    avatar_url: "https://avatars.githubusercontent.com/u/42211?v=4",
  },
  {
    id: 198,
    user_id: 237173,
    following_user_id: 71359736,
    created_at: "2016-10-19 13:24:51.000000",
    updated_at: "2022-08-28 22:04:29.000000",
    bio: "OpenSauced User",
    login: "bdougie",
    avatar_url: "https://avatars.githubusercontent.com/u/5713670?v=4",
  },
];

const Following: WithPageLayout = () => {
  const filter = "following",
    loading = false;
  const topRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { sessionToken } = useSupabaseAuth(true);

  const fetchFollowing = async (page = 1) => {
    if (!sessionToken) return;
    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${router.query.username}/following`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${sessionToken}`,
      },
    });
    const users = await req.json();
  };

  useEffect(() => {
    fetchFollowing();
  }, [sessionToken]);

  return (
    <div className="w-full ">
      <div
        className="container flex flex-col justify-between w-full px-2 pt-16 mx-auto overflow-hidden md:px-16 md:flex-row md:gap-20 lg:gap-40"
        ref={topRef}
      >
        <div className="flex flex-col gap-4 w-80">
          <Title className="!text-2xl !text-light-slate-12" level={3}>
            Users
          </Title>
          <aside className="flex flex-col gap-2">
            <Button
              variant="link"
              className={clsx(
                "hover:text-orange-600",
                filter === "following" ? "text-orange-600" : "text-light-slate-11"
              )}
              onClick={() => {
                router.push(`/user/users?filter=follow`);
              }}
              aria-label="Filter users by Follows"
            >
              Followers
            </Button>
            <Button
              variant="link"
              className={clsx(
                "hover:text-orange-600",
                filter === "following" ? "text-orange-600" : "text-light-slate-11"
              )}
              onClick={() => {
                router.push(`/user/following`);
              }}
              aria-label="Filter users by Reactions"
            >
              Following
            </Button>
          </aside>
        </div>
        <div className="flex-1 mt-10 md:mt-0">
          {loading ? (
            <div className="flex flex-col gap-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div className="flex gap-2" key={index}>
                  <SkeletonWrapper width={50} height={50} />
                  <div className="">
                    <SkeletonWrapper height={20} width={500} classNames="mb-2" />
                    <SkeletonWrapper height={10} width={100} />
                  </div>
                </div>
              ))}
            </div>
          ) : users?.length <= 0 && !loading ? (
            <DashContainer>
              <div className="text-center">
                <p>
                  You don&apos;t have any {changeCapitalization(filter === "following" ? "reaction" : filter, true)}{" "}
                  users yet! <br />
                </p>
              </div>
            </DashContainer>
          ) : (
            <div className="flex flex-col gap-2 mb-10">
              {users?.map((user) => (
                <Link href={`/user/${user?.login}`} key={user?.id}>
                  <div className="p-2 border bg-light-slate-2 rounded-lg flex items-center gap-4">
                    <Avatar
                      initialsClassName="text-8xl leading-none"
                      initials={user?.name?.charAt(0)}
                      hasBorder
                      avatarURL={user?.avatar_url}
                      size={50}
                      isCircle
                    />
                    <div className="flex flex-col gap-2">
                      <p className="text-light-slate-12 flex gap-2 items-center">
                        <span className="font-bold">{user.name || user.login}</span>
                        {user.name && <span className="text-xs">{user.login}</span>}
                      </p>
                      <span className="text-xs font-normal text-light-slate-11">{user.bio}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          {/* {users?.length > 0 && (usersResponse?.meta?.pageCount ?? 0) > 1 && (
                        <div className="my-10 flex px-2 items-center justify-between">
                            <div className="flex items-center w-max gap-x-4">
                                <PaginationResults
                                    metaInfo={
                                        usersResponse?.meta ?? {
                                            itemCount: 0,
                                            limit: 0,
                                            page: 0,
                                            hasNextPage: false,
                                            hasPreviousPage: false,
                                            pageCount: 0,
                                        }
                                    }
                                    total={usersResponse?.meta?.itemCount ?? 0}
                                    entity={"users"}
                                />
                            </div>
                            <Pagination
                                pages={[]}
                                totalPage={usersResponse?.meta?.pageCount ?? 0}
                                page={usersResponse?.meta?.page ?? 0}
                                pageSize={usersResponse?.meta?.itemCount ?? 0}
                                goToPage
                                hasNextPage={usersResponse?.meta?.hasNextPage ?? false}
                                hasPreviousPage={usersResponse?.meta?.hasPreviousPage ?? false}
                                onPageChange={(pageNumber) => handlePageChange(pageNumber)}
                            />
                        </div>
                    )} */}
        </div>
      </div>
    </div>
  );
};

export default Following;

Following.PageLayout = ProfileLayout;
