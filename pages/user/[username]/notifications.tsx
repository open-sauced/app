import { NextPage } from "next";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import Link from "next/link";
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import TopNav from "components/organisms/TopNav/top-nav";
import Title from "components/atoms/Typography/title";
import Button from "components/atoms/Button/button";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import PaginationResults from "components/molecules/PaginationResults/pagination-result";
import Pagination from "components/molecules/Pagination/pagination";
import DashContainer from "components/atoms/DashedContainer/DashContainer";
import Avatar from "components/atoms/Avatar/avatar";
import { getAvatarByUsername } from "lib/utils/github";
import { getNotificationURL } from "lib/utils/get-notification-url";
import changeCapitalization from "lib/utils/change-capitalization";

interface NotificationProps {}
interface NotificationResponse {
  data: DbUserNotification[];
  meta: Meta;
}

const Notifications: NextPage<NotificationProps> = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<DbUser>();
  const [notificationsResponse, setNotificationsResponse] = useState<NotificationResponse>();
  const [filter, setFilter] = useState<"all" | "follow" | "highlight_reaction">("all");
  const topRef = useRef<HTMLDivElement>(null);
  const { sessionToken } = useSupabaseAuth(true);
  console.log({ notificationsResponse });

  const router = useRouter();
  const { username } = router.query;

  const fetchUserData = async (page = 1) => {
    if (!username) return;
    setLoading(true);
    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${username}?limit=10&page=${page}`, {
      headers: {
        accept: "application/json",
      },
    });

    const data = (await req.json()) as DbUser;
    setUser(data);
    setLoading(false);
  };

  const fetchNotifications = async () => {
    if (!sessionToken) return;
    setLoading(true);
    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/notifications`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${sessionToken}`,
      },
    });
    const notifications = await req.json();
    setNotificationsResponse(notifications);
    setLoading(false);
  };

  const notifications = useMemo(() => {
    if (!notificationsResponse?.data) return [];
    if (filter === "all") return notificationsResponse?.data!;
    return notificationsResponse?.data.filter((notification) => notification.type === filter);
  }, [notificationsResponse?.data, filter]);

  useEffect(() => {
    fetchNotifications();
    fetchUserData();
    if (username && sessionToken) {
      router.push(`/user/${username}/notifications?filter=all`);
    }
  }, [sessionToken]);

  const handlePageChange = (page: number) => {
    setPage(page);
    fetchUserData(page);
  };

  return (
    <div className="w-full ">
      <TopNav />
      <div
        className="container flex flex-col justify-between w-full px-2 pt-16 mx-auto overflow-hidden md:px-16 lg:flex-row lg:gap-40"
        ref={topRef}
      >
        <div className="flex flex-col gap-4 w-80 ">
          <Title className="!text-2xl !text-light-slate-12" level={3}>
            Notifications
          </Title>
          <aside className="flex flex-col gap-2">
            <Button
              variant="link"
              className={clsx("hover:text-orange-600", filter === "all" ? "text-orange-600" : "text-light-slate-11")}
              onClick={() => {
                setFilter("all");
                router.push(`/user/${username}/notifications?filter=all`);
              }}
            >
              All
            </Button>
            <Button
              variant="link"
              className={clsx("hover:text-orange-600", filter === "follow" ? "text-orange-600" : "text-light-slate-11")}
              onClick={() => {
                setFilter("follow");
                router.push(`/user/${username}/notifications?filter=follow`);
              }}
            >
              Follow
            </Button>
            <Button
              variant="link"
              className={clsx(
                "hover:text-orange-600",
                filter === "highlight_reaction" ? "text-orange-600" : "text-light-slate-11"
              )}
              onClick={() => {
                setFilter("highlight_reaction");
                router.push(`/user/${username}/notifications?filter=highlight_reaction`);
              }}
            >
              Highlight Reaction
            </Button>
          </aside>
        </div>
        <div className="flex-1 mt-10 lg:mt-0">
          <div className="flex flex-col gap-4">
            {loading &&
              Array.from({ length: 8 }).map((_, index) => (
                <div className="flex gap-2" key={index}>
                  <SkeletonWrapper width={50} height={50} />
                  <div className="">
                    <SkeletonWrapper height={20} width={500} classNames="mb-2" />
                    <SkeletonWrapper height={10} width={100} />
                  </div>
                </div>
              ))}
          </div>
          {!loading && !notifications?.length ? (
            <DashContainer>
              <div className="text-center">
                <p>
                  You don&apos;t have any{" "}
                  {changeCapitalization(filter === "highlight_reaction" ? "Highlight Reactions" : filter, true)}{" "}
                  notifications yet! <br />
                </p>
              </div>
            </DashContainer>
          ) : (
            <div className="flex flex-col gap-2 mb-10">
              {notifications?.map((notification) => (
                <div className="p-2 border bg-light-slate-2 rounded-lg flex items-center gap-4" key={notification.id}>
                  <Avatar
                    initialsClassName="text-[100px] leading-none"
                    initials={notification.meta_id.charAt(0)}
                    className=""
                    hasBorder
                    avatarURL={!!user?.is_open_sauced_member ? getAvatarByUsername(notification.meta_id, 300) : ""}
                    size={50}
                    isCircle
                  />
                  <div className="flex flex-col gap-2">
                    <p className="text-light-slate-12 flex gap-2">
                      <Link href={getNotificationURL(notification.type, notification.id)} className="font-bold">
                        {notification.meta_id}
                      </Link>
                      <span>{notification.message.replace(notification.meta_id, " ")}</span>
                    </p>
                    <span className="text-xs font-normal text-light-slate-11">
                      {formatDistanceToNowStrict(new Date(notification.notified_at), { addSuffix: true })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {(notificationsResponse?.meta?.pageCount ?? 0) > 1 && (
            <div className="my-10 max-w-[48rem] flex px-2 items-center justify-between">
              <div className="flex items-center w-max gap-x-4">
                <PaginationResults
                  metaInfo={
                    notificationsResponse?.meta ?? {
                      itemCount: 0,
                      limit: 0,
                      page: 0,
                      hasNextPage: false,
                      hasPreviousPage: false,
                      pageCount: 0,
                    }
                  }
                  total={notificationsResponse?.meta?.itemCount ?? 0}
                  entity={"highlights"}
                />
              </div>
              <Pagination
                pages={[]}
                totalPage={notificationsResponse?.meta?.pageCount ?? 0}
                page={notificationsResponse?.meta?.page ?? 0}
                pageSize={notificationsResponse?.meta?.itemCount}
                goToPage
                hasNextPage={notificationsResponse?.meta?.hasNextPage}
                hasPreviousPage={notificationsResponse?.meta?.hasPreviousPage}
                onPageChange={function (page: number): void {
                  handlePageChange(page);
                  if (topRef.current) {
                    topRef.current.scrollIntoView({
                      behavior: "smooth",
                    });
                  }
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
