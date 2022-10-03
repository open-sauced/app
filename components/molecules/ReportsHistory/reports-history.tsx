import Text from "components/atoms/Typography/text";
import { Report } from "interfaces/report-type";

import TableTitle from "components/atoms/TableTitle/table-title";
import CSVDownload from "./csv-download";

interface ReportsHistoryProps {
  reportList?: Report[];
}

const ReportsHistory = ({ reportList }: ReportsHistoryProps): JSX.Element => {

  const tableStyles = {
    text: "text-sm font-medium text-slate-900 tracking-tight",
    col1: "flex-[1.5]",
    col2: "flex-[1]",
    col3: "flex-[1]",
    col4: "flex-[0.5] text-center"
  };
  
  return (
    <div className="flex flex-col bg-white border rounded-lg overflow-hidden">
      <div className="flex justify-between gap-2 px-3 md:px-6 py-3 rounded-t-lg bg-light-slate-3">
        <div className={tableStyles.col1}>
          <TableTitle text={"Report Name"} />
        </div>
        <div className={tableStyles.col2}>
          <TableTitle text={"Issue Date"} />
        </div>
        <div className={tableStyles.col3}>
          <TableTitle text={"Format"} />
        </div>
        <div className={tableStyles.col4}>
          <TableTitle text={"Actions"} />
        </div>
      </div>

      <div className="flex flex-col justify-between w-full gap-2">
        {reportList &&
          reportList.map((report, index) => {
            const {reportDate, reportName, reportFormat} = report;

            return (<div className="flex items-center py-3 px-3 md:px-6 odd:bg-white even:bg-slate-50 gap-2" key={index}>
              <div className={`${tableStyles.col1} ${tableStyles.text}`}>
                {reportName}
              </div>
              <div className={`${tableStyles.col2} ${tableStyles.text}`}>
                {reportDate}
              </div>
              <div className={`${tableStyles.col3} ${tableStyles.text}`}>
                {reportFormat}
              </div>
              <div className={`${tableStyles.col4} ${tableStyles.text}`}>
                <CSVDownload report={report}></CSVDownload>
              </div>
            </div>
            );
          })
        }
        {!reportList || reportList.length === 0 &&          
          <Text className="py-3 px-6">
            Currently there are no reports
          </Text>
        }
      </div>
    </div>

  );
};

export default ReportsHistory;