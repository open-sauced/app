import Button from "components/atoms/Button/button";
import Text from "components/atoms/Typography/text";
import Title from "components/atoms/Typography/title";

const ReportsFilter = (): JSX.Element => {
  return (
    <div className="flex flex-col gap-2">
      <Title level={4} >
        Select a Filter
      </Title>
      <Text>
        Download the filtered contributions from the last 30 days as a CSV. Selecting a filter will remove all the added repositories.
      </Text>
      <div className="flex gap-2">
        <div className="w-full">
          Test
        </div>
        <Button className="w-52">
          Download CSV
        </Button>
      </div>
    </div>
  );
};

export default ReportsFilter;