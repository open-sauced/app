import Button from "components/atoms/Button/button";
import Icon from "components/atoms/Icon/icon";
import Title from "components/atoms/Typography/title";
import GitHubIcon from "public/icons/github-icon.svg";
import ReportsHistory from "components/molecules/ReportsHistory/reports-history";
import SelectReportsFilter from "components/molecules/SelectReportsFilter/select-reports-filter";
import WaitlistButton from "components/molecules/WaitlistButton/waitlist-button";
import { useGlobalStateContext } from "context/global-state";
import { Report } from "interfaces/report-type";
import useFilterOptions from "lib/hooks/useFilterOptions";
import { useRepositoriesList } from "lib/hooks/useRepositoriesList";
import useSession from "lib/hooks/useSession";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import getCurrentDate from "lib/utils/get-current-date";
import { useState } from "react";

const USERDEVICESTORAGENAME = "reportState";

const Reports = (): JSX.Element => {
  const userDeviceState = localStorage.getItem(USERDEVICESTORAGENAME);
  const initialState = userDeviceState ? JSON.parse(userDeviceState as string) : [];
  const { data, isLoading, isError } = useRepositoriesList();
  const [reports, setReports] = useState<Report[]>(initialState);
  const { sessionToken, user, signIn } = useSupabaseAuth();
  const { setAppState } = useGlobalStateContext();
  const { hasReports, waitlisted } = useSession();
  const [submitting, setSubmitting] = useState(false);

  const filterOptions = useFilterOptions();
  const filterList = filterOptions.map((filter) => {
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
      data: dataReady ? data : []
    };

    setReports((prevState) => {
      const newState = [...prevState, constructedReport];
      localStorage.setItem(USERDEVICESTORAGENAME, JSON.stringify(newState));

      return newState;
    });
  };

  const handleJoinClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/waitlist`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionToken}`
        }
      });

      setAppState((state) => ({
        ...state,
        waitlisted: true
      }));
    } catch (e) {
      // handle error
    } finally {
      setSubmitting(false);
    }
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
          <WaitlistButton waitlisted={waitlisted} submitting={submitting} handleJoinClick={handleJoinClick} />
        )}
      </div>
    </section>
  );
};

export default Reports;
