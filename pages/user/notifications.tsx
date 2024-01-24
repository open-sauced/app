import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import Link from "next/link";

import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
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
import ProfileLayout from "layouts/profile";
import { WithPageLayout } from "interfaces/with-page-layout";

interface NotificationResponse {
  data: DbUserNotification[];
  meta: Meta;
}

const Notifications: WithPageLayout = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [notificationsResponse, setNotificationsResponse] = useState<NotificationResponse>();
  const [filter, setFilter] = useState<"all" | "follow" | "highlight_reaction">("all");

  const topRef = useRef<HTMLDivElement>(null);
  const { sessionToken } = useSupabaseAuth(true);

  const router = useRouter();

  const fetchNotifications = async (page = 1) => {
    if (!sessionToken) return;
    setLoading(true);
    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/notifications?limit=10&page=${page}`, {
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
    if (filter === "all") return notificationsResponse?.data;
    return notificationsResponse?.data.filter((notification) => notification.type === filter);
  }, [notificationsResponse?.data, filter]);

  useEffect(() => {
    fetchNotifications();

    if (sessionToken) {
      router.push(`/user/notifications?filter=all`);
    }
  }, [sessionToken]);

  const handlePageChange = (page: number) => {
    setPage(page);
    fetchNotifications(page);
    if (topRef.current) {
      topRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full ">
      <div
        className="container flex flex-col justify-between w-full px-2 pt-16 mx-auto overflow-hidden md:px-16 md:flex-row md:gap-20 lg:gap-40"
        ref={topRef}
      >
        <div className="flex flex-col gap-4 w-80">
          <Title className="!text-2xl !text-light-slate-12" level={3}>
            Notifications
          </Title>
          <aside className="flex flex-col gap-2">
            <Button
              variant="link"
              className={clsx("hover:text-orange-600", filter === "all" ? "text-orange-600" : "text-light-slate-11")}
              onClick={() => {
                setFilter("all");
                router.push(`/user/notifications?filter=all`);
              }}
              aria-label="Show All Notifications"
            >
              All
            </Button>
            <Button
              variant="link"
              className={clsx("hover:text-orange-600", filter === "follow" ? "text-orange-600" : "text-light-slate-11")}
              onClick={() => {
                setFilter("follow");
                router.push(`/user/notifications?filter=follow`);
              }}
              aria-label="Filter Notifications by Follows"
            >
              Follows
            </Button>
            <Button
              variant="link"
              className={clsx(
                "hover:text-orange-600",
                filter === "highlight_reaction" ? "text-orange-600" : "text-light-slate-11"
              )}
              onClick={() => {
                setFilter("highlight_reaction");
                router.push(`/user/notifications?filter=highlight_reaction`);
              }}
              aria-label="Filter Notifications by Reactions"
            >
              Reactions
            </Button>
          </aside>
        </div>
        <div className="flex-1 mt-10 md:mt-0">
          {loading ? (
            <div className="flex flex-col gap-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div className="flex gap-2" key={index}>
                  <SkeletonWrapper width={50} height={50} />
                  <div>
                    <SkeletonWrapper height={20} width={500} classNames="mb-2" />
                    <SkeletonWrapper height={10} width={100} />
                  </div>
                </div>
              ))}
            </div>
          ) : notifications?.length <= 0 && !loading ? (
            <DashContainer>
              <div className="text-center">
                <p>
                  You don&apos;t have any{" "}
                  {changeCapitalization(filter === "highlight_reaction" ? "reaction" : filter, true)} notifications yet!{" "}
                  <br />
                </p>
              </div>
            </DashContainer>
          ) : (
            <div className="flex flex-col gap-2 mb-10">
              {notifications?.map((notification) => (
                <div className="p-2 border bg-light-slate-2 rounded-lg flex items-center gap-4" key={notification.id}>
                  <Link href={`/user/${notification.from_user.login}`}>
                    <Avatar
                      initialsClassName="text-8xl leading-none"
                      initials={notification.meta_id.charAt(0)}
                      hasBorder
                      avatarURL={getAvatarByUsername(notification.from_user.login, 300)}
                      size={50}
                      isCircle
                    />
                  </Link>
                  <div className="flex flex-col gap-2">
                    <Link href={getNotificationURL(notification.type, notification.meta_id)}>
                      <p className="text-light-slate-12 flex gap-2">
                        <span className="font-bold">{notification.from_user.login}</span>
                        <span>{notification.message.replace(notification.from_user.login, " ")}</span>
                      </p>
                      <span className="text-xs font-normal text-light-slate-11">
                        {formatDistanceToNowStrict(new Date(notification.notified_at), { addSuffix: true })}
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          {notifications?.length > 0 && (notificationsResponse?.meta?.pageCount ?? 0) > 1 && (
            <div className="my-10 flex px-2 items-center justify-between">
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
                  entity={"notifications"}
                />
              </div>
              <Pagination
                pages={[]}
                totalPage={notificationsResponse?.meta?.pageCount ?? 0}
                page={notificationsResponse?.meta?.page ?? 0}
                pageSize={notificationsResponse?.meta?.itemCount ?? 0}
                goToPage
                hasNextPage={notificationsResponse?.meta?.hasNextPage ?? false}
                hasPreviousPage={notificationsResponse?.meta?.hasPreviousPage ?? false}
                onPageChange={(pageNumber) => handlePageChange(pageNumber)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Notifications.PageLayout = ProfileLayout;

export default Notifications;
