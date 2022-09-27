import Title from "components/atoms/Typography/title";
import ReportsHistory from "components/molecules/ReportsHistory/reports-history";
import SelectReportsFilter from "components/molecules/SelectReportsFilter/select-reports-filter";
import { Report } from "interfaces/report-type";
import useFilterOptions from "lib/hooks/useFilterOptions";
import { useRepositoriesList } from "lib/hooks/useRepositoriesList";
import useSession from "lib/hooks/useSession";
import getCurrentDate from "lib/utils/get-current-date";
import { useState } from "react";

const USERDEVICESTORAGENAME = "reportState";

const Reports = (): JSX.Element => {
  const userDeviceState = localStorage.getItem(USERDEVICESTORAGENAME);
  const initialState = userDeviceState ? JSON.parse(userDeviceState as string) : [];
  const { data, isLoading, isError } = useRepositoriesList();
  const [reports, setReports] = useState<Report[]>(initialState);
  const { hasReports } = useSession();

  const filterOptions = useFilterOptions();
  const filterList = filterOptions.map((filter) => {
    return {
      filterName: filter,
      filterValue: filter.toLowerCase().replaceAll(" ", "-"),
    };
  });

  const handleFilterClick = (selectedFilter: string) => {
    const dataReady = !isLoading && !isError;

    const constructedReport = {
      reportName: selectedFilter,
      reportDate: getCurrentDate(),
      reportFormat: "CSV",
      isGenerated: dataReady,
      data: dataReady ? data : [],
    };

    setReports((prevState) => {
      const newState = [...prevState, constructedReport];
      localStorage.setItem(USERDEVICESTORAGENAME, JSON.stringify(newState));

      return newState;
    });
  };

  return (
    <section className="flex flex-col w-full py-4 px-2 md:px-4 justify-center items-center">
      <div className="max-w-4xl">
        <Title className="!font-medium relative" level={3}>
          Contribution Insights
        </Title>
        <hr className="border-light-slate-6 my-4" />

        {hasReports ? (
          <>
            <SelectReportsFilter filterList={filterList} callback={handleFilterClick} />

            {reports.length > 0 && (
              <>
                <Title className="!font-medium relative mt-16" level={3}>
                  Download History
                </Title>
                <hr className="border-light-slate-6 my-4" />
                <ReportsHistory reportList={reports} />
              </>
            )}
          </>
        ) : hasReports === undefined ? (
          <div>Loading...</div>
        ) : (
          <div>You don't have access to generate custom reports</div>
        )}
      </div>
    </section>
  );
};

export default Reports;
