import { useUser } from "@supabase/auth-helpers-react";
import { useState } from "react";

import GitHubIcon from "img/icons/github-icon.svg";

import Button from "components/atoms/Button/button";
import Icon from "components/atoms/Icon/icon";
import Title from "components/atoms/Typography/title";
import ReportsHistory from "components/molecules/ReportsHistory/reports-history";
import SelectReportsFilter from "components/molecules/SelectReportsFilter/select-reports-filter";

import { Report } from "interfaces/report-type";

import useFilterOptions from "lib/hooks/useFilterOptions";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import getCurrentDate from "lib/utils/get-current-date";
import StripeCheckoutButton from "../StripeCheckoutButton/stripe-checkout-button";

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

  const { signIn } = useSupabaseAuth();
  const user = useUser();

  const filterOptions = useFilterOptions();
  const filterList = filterOptions.map((filter) => {
    return {
      filterName: filter,
      filterValue: filter.toLowerCase().replaceAll(" ", "-"),
    };
  });

  const handleFilterClick = async (selectedFilter: string) => {
    const constructedReport = {
      reportName: selectedFilter,
      reportDate: getCurrentDate(),
      reportFormat: "CSV",
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
        {user ? (
          hasReports ? (
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
          ) : (
            <StripeCheckoutButton />
          )
        ) : (
          <div className="flex justify-center py-4">
            <Button variant="primary" onClick={async () => await signIn({ provider: "github" })}>
              Connect with GitHub <Icon IconImage={GitHubIcon} className="ml-2" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Reports;
