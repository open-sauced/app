import Card from "components/atoms/Card/card";
import Title from "components/atoms/Typography/title";

const ReportsHistory = (): JSX.Element => {
  const heading = <Title level={5} className="!text-light-slate-9 uppercase">
    <div className="flex justify-between w-full">
      <div className="w-[40%] border-1 p-2">
        Report Date
      </div>
      <div className="w-[20%] border-1 p-2">
        issue date
      </div>
      <div className="w-[20%] border-1 p-2">
        Format
      </div>
      <div className="w-[20%] border-1 p-2">
      </div>
    </div>
  </Title>;
  
  return (
    <Card heading={heading}>
      <div className="flex justify-between w-full">
        <div className="w-[40%] border-1 p-2">
          Test
        </div>
        <div className="w-[20%] border-1 p-2">
          Test
        </div>
        <div className="w-[20%] border-1 p-2">
          Test
        </div>
        <div className="w-[20%] border-1 p-2">
          Test
        </div>
      </div>
    </Card>
  );
};

export default ReportsHistory;