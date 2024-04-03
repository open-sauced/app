import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import clsx from "clsx";

import { GetServerSidePropsContext } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import InsightRow from "components/molecules/InsightRow/insight-row";
import Pagination from "components/molecules/Pagination/pagination";
import PaginationResults from "components/molecules/PaginationResults/pagination-result";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";

import HubLayout from "layouts/hub";
import { WithPageLayout } from "interfaces/with-page-layout";
import useUserInsights from "lib/hooks/useUserInsights";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import useSession from "lib/hooks/useSession";
import { useToast } from "lib/hooks/useToast";
import Text from "components/atoms/Typography/text";
import useFetchFeaturedInsights from "lib/hooks/useFetchFeaturedInsights";
import ClientOnly from "components/atoms/ClientOnly/client-only";
import { getAllFeatureFlags } from "lib/utils/server/feature-flags";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const supabase = createPagesServerClient(context);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const userId = Number(session?.user.user_metadata.sub);
  const featureFlags = await getAllFeatureFlags(userId);

  return {
    props: {
      featureFlags,
    },
  };
};

const DeleteInsightPageModal = dynamic(() => import("components/organisms/InsightPage/DeleteInsightPageModal"));

const InsightsHub: WithPageLayout = () => {
  const router = useRouter();
  const { user, sessionToken } = useSupabaseAuth();

  const { toast } = useToast();
  const { session } = useSession(true);
  const { data, meta, isError, isLoading, setPage, mutate } = useUserInsights(!!user);
  const {
    data: featuredInsightsData,
    isError: featuredInsightsError,
    isLoading: featuredInsightsLoading,
  } = useFetchFeaturedInsights(user ? false : true);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [insightNameToDelete, setInsightNameToDelete] = useState("");
  const [insightIdToDelete, setInsightIdToDelete] = useState<number>();

  function handleView() {
    const insight = data.slice(0, 1).shift();
    router.push(`/pages/${user?.user_metadata.user_name}/${insight!.id}/dashboard`);
  }

  function handleOnDelete(insightName: string, insightId: number) {
    setIsDeleteOpen(true);
    setInsightNameToDelete(insightName);
    setInsightIdToDelete(insightId);
  }

  const handleOnClose = () => {
    setIsDeleteOpen(false);
  };

  const handleOnConfirm = async () => {
    setSubmitted(true);
    setDeleteLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/insights/${insightIdToDelete}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
      });

      if (res.ok) {
        setIsDeleteOpen(false);
        mutate();
        toast({ description: "Insight deleted successfully", variant: "success" });
      }
    } catch (err) {
      setIsDeleteOpen(false);
      // eslint-disable-next-line no-console
      console.log(err);
      toast({ description: "An error occurred while deleting the insight", variant: "danger" });
    } finally {
      setDeleteLoading(false);
    }
  };

  function openInsightToast() {
    const toaster = toast({
      description: "Welcome to your Insights Hub!",
      variant: "success",
      duration: 10000,
      action: (
        <div className="flex flex-col">
          <div className="flex align-middle">
            <Text>
              {user
                ? "We've included a featured Insight Page for you to test out. You can also create your own to get insights on repositories."
                : "Try out our Demo Insight page or sign up to create your own"}
            </Text>
          </div>
          <div className="flex flex-start">
            <button
              onClick={() => {
                toaster && toaster.dismiss();
              }}
            >
              <Text className="pr-2 cursor-pointer">Dismiss</Text>
            </button>
            {session ? (
              <button
                onClick={() => {
                  toaster && toaster.dismiss();
                  handleView();
                }}
              >
                <Text className="text-orange-500 cursor-pointer">Open Insight Page</Text>
              </button>
            ) : null}
          </div>
        </div>
      ),
    });

    localStorage.setItem("dismissFeaturedInsights", "true");
  }

  useEffect(() => {
    // if the current user with insights logs out, set the flag
    if (!localStorage.getItem("dismissFeaturedInsights") && data.length > 0) {
      localStorage.setItem("dismissFeaturedInsights", "true");
    }
  }, [data]);

  useEffect(() => {
    if (
      (session && session.insights_count === 0 && !localStorage.getItem("dismissFeaturedInsights")) ||
      (featuredInsightsData.length === 1 && !localStorage.getItem("dismissFeaturedInsights"))
    ) {
      openInsightToast();
    }
  }, [session, featuredInsightsData]);

  return (
    <>
      <section className="flex flex-col gap-4 pt-4">
        {user ? (
          <>
            {session && isLoading ? (
              <SkeletonWrapper count={3} classNames="w-full" height={95} radius={10} />
            ) : isError ? (
              "Error..."
            ) : (
              data.map((insight) => {
                return (
                  <InsightRow
                    key={`insights_${insight.id}`}
                    user={user}
                    insight={insight}
                    handleOnDeleteClick={(name, id) => handleOnDelete(name, id)}
                  />
                );
              })
            )}
          </>
        ) : null}

        <ClientOnly>
          {!session && featuredInsightsLoading ? (
            <SkeletonWrapper count={1} classNames="w-full" height={95} radius={10} />
          ) : featuredInsightsError ? (
            "Error..."
          ) : (
            featuredInsightsData.map((insight) => {
              return <InsightRow key={`insights_${insight.id}`} user={user} insight={insight} isEditable={false} />;
            })
          )}
        </ClientOnly>
      </section>

      <div
        className={clsx("py-1 md:py-4 flex w-full md:mt-5 justify-between items-center", {
          hidden: meta.itemCount <= meta.limit,
        })}
      >
        <PaginationResults metaInfo={meta} total={meta.itemCount} entity={"insights"} />
        <Pagination
          pages={[]}
          hasNextPage={meta.hasNextPage}
          hasPreviousPage={meta.hasPreviousPage}
          totalPage={meta.pageCount}
          page={meta.page}
          onPageChange={function (page: number): void {
            setPage(page);
          }}
          divisor={true}
          goToPage
        />
      </div>
      <DeleteInsightPageModal
        isLoading={deleteLoading}
        open={isDeleteOpen}
        setOpen={setIsDeleteOpen}
        submitted={submitted}
        pageName={insightNameToDelete}
        onConfirm={handleOnConfirm}
        onClose={handleOnClose}
      />
    </>
  );
};

InsightsHub.PageLayout = HubLayout;
InsightsHub.SEO = {
  title: "Insights Hub | OpenSauced Insights",
};

export default InsightsHub;
