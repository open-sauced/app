import Title from "components/atoms/Typography/title";
import SelectReportsFilter from "components/molecules/SelectReportsFilter/select-reports-filter";

const Reports = (): JSX.Element => {
  return (
    <section className="w-full py-4 px-8 flex justify-center">
      <div className="max-w-4xl">
        <Title className="!font-medium relative !text-left " level={3}>
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
        <Title className="!font-medium relative mt-16 !text-left " level={3}>
          Download History
        </Title>
        <hr className="border-light-slate-6 my-4" />
        {/* Download History goes here */}
      </div>
    </section>
  );
};

export default Reports;
