import Card from "../../atoms/Card/card";
import RepositoryTable from "components/molecules/RepositoryTable/repository-table";
import {useRepositoriesList} from "lib/hooks/useRepositoriesList";

const Reports = (): JSX.Element => {
  const { data, isError, isLoading } = useRepositoriesList();

  return (
    <div className="flex flex-col w-full gap-4">
      <Card className="w-full lg:w-[calc(50%-(1rem/2))] xl:!w-[calc(40%-(1rem/2))] px-1 xs:px-5 py-5">
        {
          isLoading ?
            <>...Loading</> :
            isError ?
              <>An error has occured...</>
              :
              <RepositoryTable rows={data} title="Repositories" tableType="participants" />}
      </Card>
    </div>
  );
};

export default Reports;
