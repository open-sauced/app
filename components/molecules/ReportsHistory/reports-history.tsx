import Card from "components/atoms/Card/card";
import Title from "components/atoms/Typography/title";

const ReportsHistory = (): JSX.Element => {
  const heading = <Title level={5} className="!text-light-slate-9">Hello</Title>;
  
  return (
    <Card heading={heading}>
      <div>
        Hello
      </div>
    </Card>
  );
};

export default ReportsHistory;