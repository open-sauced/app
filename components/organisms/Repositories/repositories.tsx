import { useRepositoriesList } from "lib/hooks/useRepositoriesList";
import { useRepositoryPRs } from "lib/hooks/useRepositoryPRs";
import RepositoriesTable from "../RepositoriesTable/repositories-table";

const Reports = (): JSX.Element => {
  const {
    data: repoListData,
    meta: repoMeta,
    isError: repoListIsError,
    isLoading: repoListIsLoading,
    page,
    setPage
  } = useRepositoriesList();
  const preparedIds = !repoListIsLoading && !repoListIsError ? repoListData.map((row) => `${row.id}`) : [];
  // How do I make multiple calls?

  return (
    <div className="flex flex-col w-full gap-4">
      {repoListIsLoading && <>...Loading</>}
      {repoListIsError && <>An error has occured...</>}
      {!repoListIsLoading && !repoListIsError && (
        <RepositoriesTable meta={repoMeta} page={page} setPage={setPage} listOfRepositories={repoListData} />
      )}
    </div>
  );
};

export default Reports;
