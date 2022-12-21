import { useState } from "react";

import GitHubIcon from "public/icons/github-icon.svg";

import Button from "components/atoms/Button/button";
import Icon from "components/atoms/Icon/icon";
import Title from "components/atoms/Typography/title";
import ReportsHistory from "components/molecules/ReportsHistory/reports-history";
import SelectReportsFilter from "components/molecules/SelectReportsFilter/select-reports-filter";
import StripeCheckoutButton from "../StripeCheckoutButton/stripe-checkout-button";

import { Report } from "interfaces/report-type";

import useFilterOptions from "lib/hooks/useFilterOptions";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import getCurrentDate from "lib/utils/get-current-date";

const USERDEVICESTORAGENAME = "reportState";

interface ReportsProps {
  hasReports?: boolean;
  waitlisted?: boolean;
  repositories?: number[];
}

const Reports = ({ hasReports, repositories }: ReportsProps): JSX.Element => {
  const userDeviceState = localStorage.getItem(USERDEVICESTORAGENAME);
  const initialState = userDeviceState ? JSON.parse(userDeviceState as string) : [];
  const [reports, setReports] = useState<Report[]>(initialState);
  const { user, signIn } = useSupabaseAuth();

  const filterOptions = useFilterOptions();
  const filterList = filterOptions.map((filter) => {
    return {
      filterName: filter,
      filterValue: filter.toLowerCase().replaceAll(" ", "-")
    };
  });

  const handleFilterClick = async (selectedFilter: string) => {
    const constructedReport = {
      reportName: selectedFilter,
      reportDate: getCurrentDate(),
      reportFormat: "CSV"
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
        <Title className=" relative" level={3}>
          Contribution Insights
        </Title>
        <hr className="border-light-slate-6 my-4" />

        {hasReports ? (
          <>
            <SelectReportsFilter filterList={filterList} callback={handleFilterClick} />

            {reports.length > 0 && (
              <>
                <Title className=" relative mt-16" level={3}>
                  Download History
                </Title>
                <hr className="border-light-slate-6 my-4" />
                <ReportsHistory reportList={reports} repositories={repositories} />
              </>
            )}
          </>
        ) : hasReports === undefined ? (
          <div>
            {user ? (
              <div>Loading...</div>
            ) : (
              <div className="flex justify-center py-4">
                <Button type="primary" onClick={async () => await signIn({ provider: "github" })}>
                  Connect with GitHub <Icon IconImage={GitHubIcon} className="ml-2" />
                </Button>
              </div>
            )}
          </div>
        ) : (
          <StripeCheckoutButton />
        )}
      </div>
    </section>
  );
};

export default Reports;
