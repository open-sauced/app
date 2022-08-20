import Button from "components/atoms/Button/button";
import Card from "components/atoms/Card/card";
import Title from "components/atoms/Typography/title";
import Text from "components/atoms/Typography/text";
import { Report } from "interfaces/report-type";

interface ReportsHistoryProps {
  reportList?: Report[];
}

const ReportsHistory = ({ reportList }: ReportsHistoryProps): JSX.Element => {
  const heading = <Title level={5} className="!text-light-slate-9 uppercase">
    <div className="flex justify-between w-full gap-2">
      <div className="w-2/5 text-xs font-semibold text-slate-400 tracking-wide uppercase">
        report date
      </div>
      <div className="w-1/5 text-xs font-semibold text-slate-400 tracking-wide uppercase">
        issue date
      </div>
      <div className="w-1/5 text-xs font-semibold text-slate-400 tracking-wide uppercase">
        format
      </div>
      <div className="w-1/5 text-xs font-semibold text-slate-400 tracking-wide uppercase">
        {null}
      </div>
    </div>
  </Title>;
  
  return (
    <Card heading={heading}>
      <div className="flex flex-col justify-between w-full gap-2">
        {reportList ?
          reportList.map(({reportDate, reportName, reportFormat, isGenerated}, index) => 
            <div className={`flex items-center py-3 px-6 ${index % 2 === 0 ? "bg-slate-50" : "bg-white"} gap-2`} key={index}>
              <div className="w-2/5 text-sm font-medium text-slate-900 tracking-tight">
                {reportName}
              </div>
              <div className="w-1/5 text-sm font-medium text-slate-900 tracking-tight">
                {reportDate}
              </div>
              <div className="w-1/5 text-sm font-medium text-slate-900 tracking-tight">
                {reportFormat}
              </div>
              <div className="w-1/5 text-sm font-medium text-slate-900 tracking-tight text-right">
                {isGenerated ?
                  <Button type="link" >Download</Button>
                
                  :
                
                  <Button type="link" className="!text-light-slate-10" disabled >Generating...</Button>
                }
              </div>
            </div>
          )
          
          :
          
          <Text className="py-3 px-6">
            Currently there are no reports
          </Text>
        }
      </div>
    </Card>
  );
};

export default ReportsHistory;