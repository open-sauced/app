import Button from "components/atoms/Button/button";
import Card from "components/atoms/Card/card";
import Title from "components/atoms/Typography/title";
import Text from "components/atoms/Typography/text";
import { Report } from "interfaces/report-type";
import { CSVLink } from "react-csv";
import TableTitle from "components/atoms/TableTitle/table-title";

interface ReportsHistoryProps {
  reportList?: Report[];
}

const ReportsHistory = ({ reportList }: ReportsHistoryProps): JSX.Element => {
  
  return (
    <div className="flex flex-col bg-white border rounded-lg overflow-hidden">
      <div className="flex justify-between gap-2 px-3 md:px-6 py-3 rounded-t-lg bg-light-slate-3">
          <TableTitle text={"Report Name"} />
          <TableTitle text={"Issue Date"} />
          <TableTitle text={"Format"} />
          <TableTitle text={"Actions"} />
      </div>

      <div className="flex flex-col justify-between w-full gap-2">
        {reportList &&
          reportList.map(({reportDate, reportName, reportFormat, isGenerated, data}, index) => 
            <div className={`flex items-center py-3 px-3 md:px-6 ${index % 2 === 0 ? "bg-slate-50" : "bg-white"} gap-2`} key={index}>
              <div className="w-2/5 md:w-2/5 text-sm font-medium text-slate-900 tracking-tight">
                {reportName}
              </div>
              <div className="w-1/5 text-sm font-medium text-slate-900 tracking-tight">
                {reportDate}
              </div>
              <div className="w-1/5 text-sm font-medium text-slate-900 tracking-tight">
                {reportFormat}
              </div>
              <div className="w-2/5 text-sm font-medium text-slate-900 tracking-tight text-right">
                {isGenerated ?
                  <CSVLink data={data}>
                    <Button type="link" >Download</Button>
                  </CSVLink>
                
                  :
                
                  <Button type="link" className="!text-light-slate-10" disabled >Generating...</Button>
                }
              </div>
            </div>
          )
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