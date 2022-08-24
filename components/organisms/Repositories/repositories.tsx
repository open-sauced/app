import Card from "../../atoms/Card/card";
import SelectableTable from "components/molecules/SelectableTable/repository-table";
import {useRepositoriesList} from "lib/hooks/useRepositoriesList";

const Reports = (): JSX.Element => {
  const { repoList, isLoading } = useRepositoriesList();
  const data = repoList.data || {data: []};

  return (
    <div className="flex flex-col w-full gap-4">
      <Card className="w-full lg:w-[calc(50%-(1rem/2))] xl:!w-[calc(40%-(1rem/2))] px-1 xs:px-5 py-5">
        {isLoading ? <>...Loading</> : <SelectableTable rows={data} title="Repositories" tableType="participants" />}
      </Card>
    </div>
  );
};

export default Reports;
