import Card from "../../atoms/Card/card";
import RepositoryTable from "components/molecules/RepositoryTable/repository-table";
import {useRepositoriesList} from "lib/hooks/useRepositoriesList";
import { useRepositoryPRs } from "lib/hooks/useRepositoryPRs";

const Reports = (): JSX.Element => {
  const { data: repoListData, isError: repoListIsError, isLoading: repoListIsLoading } = useRepositoriesList();

  const preparedIds = !repoListIsLoading && !repoListIsError ? repoListData.map(row => `${row.id}`) : [];

  // How do I make multiple calls?

  return (
    <div className="flex flex-col w-full gap-4">
      <Card className="w-full lg:w-99 px-1 xs:px-5 py-5">
        <>
          {repoListIsLoading && <>...Loading</>}
          {repoListIsError && <>An error has occured...</>}
          {!repoListIsLoading && !repoListIsError && <RepositoryTable rows={repoListData} title="Repositories" tableType="participants" />}
        </>
      </Card>
    </div>
  );
};

export default Reports;
