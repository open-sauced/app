import Card from "../../atoms/Card/card";
import SelectableTable from "components/molecules/SelectableTable/selectable-table";
import useRepositoriesList from "lib/hooks/useRepositoriesList";

const Reports = (): JSX.Element => {
  const { repositoriesList } = useRepositoriesList();
  return (
    <div className="flex flex-col w-full gap-4">
      <Card className="w-full lg:w-[calc(50%-(1rem/2))] xl:!w-[calc(40%-(1rem/2))] px-1 xs:px-5 py-5">
        <SelectableTable rows={repositoriesList} title="Repositories" tableType="participants" />
      </Card>
    </div>
  );
};

export default Reports;
