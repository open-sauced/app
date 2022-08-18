import Title from "components/atoms/Typography/title";
import SelectReportsFilter from "components/molecules/SelectReportsFilter/select-reports-filter";

const Reports = (): JSX.Element => {
  return (
    <section className="w-full py-4 grid grid-cols-12">
      <div className="col-start-4 col-end-9">
        <Title className="!font-medium relative !text-left " level={3}>
          Contributions Insights
        </Title>
        <hr className="border-light-slate-6 my-5" />
        <div className="!text-left">
          <SelectReportsFilter
            callback={function () {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
      </div>
      {/* Download History goes here */}
    </section>
  );
};

export default Reports;
