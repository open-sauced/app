import Text from "components/atoms/Typography/text";
import TableTitle from "components/atoms/TableTitle/table-title";

import { Report } from "interfaces/report-type";

import CSVDownload from "./csv-download";

interface ReportsHistoryProps {
  reportList?: Report[];
  repositories?: number[];
}

const ReportsHistory = ({ reportList, repositories }: ReportsHistoryProps): JSX.Element => {
  const tableStyles = {
    text: "text-sm text-slate-900 tracking-tight",
    col1: "flex-[1] text-center",
    col2: "flex-[1] text-center",
    col3: "flex-[1] text-center",
    col4: "flex-[1] text-center",
  };

  return (
    <div className="flex flex-col overflow-hidden bg-white border rounded-lg">
      <div className="flex justify-between px-3 py-3 rounded-t-lg md:px-6 bg-light-slate-3">
        <div className={tableStyles.col1}>
          <TableTitle>Report Name</TableTitle>
        </div>
        <div className={tableStyles.col2}>
          <TableTitle>Issue Date</TableTitle>
        </div>
        <div className={tableStyles.col3}>
          <TableTitle>Format</TableTitle>
        </div>
        <div className={tableStyles.col4}>
          <TableTitle>Actions</TableTitle>
        </div>
      </div>

      <div className="flex flex-col justify-between w-full">
        {reportList &&
          reportList.map((report, index) => {
            const { reportDate, reportName, reportFormat } = report;

            return (
              <div className="flex items-center px-3 py-3 md:px-6 odd:bg-white even:bg-slate-50" key={index}>
                <div className={`${tableStyles.col1} ${tableStyles.text}`}>{reportName}</div>
                <div className={`${tableStyles.col2} ${tableStyles.text}`}>{reportDate}</div>
                <div className={`${tableStyles.col3} ${tableStyles.text}`}>{reportFormat}</div>
                <div className={`${tableStyles.col4} ${tableStyles.text}`}>
                  <CSVDownload report={report} repositories={repositories}></CSVDownload>
                </div>
              </div>
            );
          })}
        {!reportList || (reportList.length === 0 && <Text className="px-6 py-3">Currently there are no reports</Text>)}
      </div>
    </div>
  );
};

export default ReportsHistory;
