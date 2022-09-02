import Title from "components/atoms/Typography/title";
import ReportsHistory from "components/molecules/ReportsHistory/reports-history";
import SelectReportsFilter from "components/molecules/SelectReportsFilter/select-reports-filter";
import { Report } from "interfaces/report-type";
import useFilterOptions from "lib/hooks/useFilterOptions";
import { useRepositoriesList } from "lib/hooks/useRepositoriesList";
import getCurrentDate from "lib/utils/get-current-date";
import { useState } from "react";

const Reports = (): JSX.Element => {
  const { data, isLoading, isError } = useRepositoriesList();
  const [ reports, setReports ] = useState<Report[]>([]);

  const filterOptions = useFilterOptions();
  const filterList = filterOptions.map(filter => {
    return {
      filterName: filter,
      filterValue: filter.toLowerCase().replaceAll(" ", "-")
    };
  });

  const handleFilterClick = (selectedFilter: string) => {
    const dataReady = !isLoading && !isError;

    const constructedReport = {
      reportName: selectedFilter,
      reportDate: getCurrentDate(),
      reportFormat: "CSV",
      isGenerated: dataReady,
      data : dataReady ? data : []
    };

    setReports(prevState => [ ...prevState, constructedReport ]);
  };

  return (
    <section className="w-full py-4 px-8 flex justify-center">
      <div className="max-w-4xl">
        <Title className="!font-medium relative" level={3}>
          Contributions Insights
        </Title>
        <hr className="border-light-slate-6 my-4" />
        <div className="!text-left">
          <SelectReportsFilter
            filterList={filterList}
            callback={handleFilterClick}
          />
        </div>
        <Title className="!font-medium relative mt-16" level={3}>
          Download History
        </Title>
        <hr className="border-light-slate-6 my-4" />
        <div>
          <ReportsHistory reportList={reports}/>
        </div>
      </div>
    </section>
  );
};

export default Reports;
