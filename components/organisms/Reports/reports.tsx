import Title from "components/atoms/Typography/title";
import ReportsHistory from "components/molecules/ReportsHistory/reports-history";
import SelectReportsFilter from "components/molecules/SelectReportsFilter/select-reports-filter";
import { Report } from "interfaces/report-type";

// Mission Start!

const Reports = (): JSX.Element => {

  const reportList: Report[] = [
    {
      reportName: "Top Ten",
      reportDate: "Jun 3, 2022",
      reportFormat: "CSV",
      isGenerated: true
    },
    {
      reportName: "Top Five",
      reportDate: "Jun 3, 2022",
      reportFormat: "CSV",
      isGenerated: false
    }
  ];

  return (
    <section className="w-full py-4 px-8 flex justify-center">
      <div className="max-w-4xl">
        <Title className="!font-medium relative" level={3}>
          Contributions Insights
        </Title>
        <hr className="border-light-slate-6 my-4" />
        <div className="!text-left">
          <SelectReportsFilter
            callback={function () {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
        <Title className="!font-medium relative mt-16" level={3}>
          Download History
        </Title>
        <hr className="border-light-slate-6 my-4" />
        <div>
          <ReportsHistory reportList={reportList}/>
        </div>
      </div>
    </section>
  );
};

export default Reports;
