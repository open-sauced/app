import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import Pagination from "components/molecules/Pagination/pagination";
import ContributorCard from "components/organisms/ContributorCard/contributor-card";
import useContributors from "lib/hooks/api/useContributors";
import { useMediaQuery } from "lib/hooks/useMediaQuery";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { setQueryParams } from "lib/utils/query-params";

type ContributorsGridProps = {
  repositoryIds: number[];
};

export default function ContributorsGrid({ repositoryIds }: ContributorsGridProps) {
  const { user } = useSupabaseAuth();
  const isMobile = useMediaQuery("(max-width: 640px)");
  const { data, meta, isError, isLoading } = useContributors(10, repositoryIds);

  return (
    <>
      <div className="grid w-full gap-3 grid-cols-automobile md:grid-cols-autodesktop">
        {isLoading ? <SkeletonWrapper height={210} radius={12} count={9} /> : ""}
        {isError ? <>An error occurred!..</> : ""}
        {!isLoading &&
          !isError &&
          data.map((contributor, index) => (
            <ContributorCard
              key={index}
              contributor={contributor}
              topic={""}
              repositories={repositoryIds}
              showOscr={!!user}
            />
          ))}
      </div>
      {meta && (
        <div className="self-end">
          <Pagination
            showPages={!isMobile}
            showTotalPages={true}
            onPageChange={(page) => {
              setQueryParams({ page: `${page}` });
            }}
            hasNextPage={meta.hasNextPage}
            hasPreviousPage={meta.hasPreviousPage}
            totalPage={meta.pageCount}
            page={meta.page}
            goToPage={true}
          />
        </div>
      )}
    </>
  );
}
