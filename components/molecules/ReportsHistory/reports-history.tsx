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
    <div className="flex justify-between w-full">
      <div className="w-2/5 border-1 p-2">
        report date
      </div>
      <div className="w-1/5 border-1 p-2">
        issue date
      </div>
      <div className="w-1/5 border-1 p-2">
        format
      </div>
      <div className="w-1/5 border-1 p-2">
        {null}
      </div>
    </div>
  </Title>;
  
  return (
    <Card heading={heading}>
      <div className="flex flex-col justify-between w-full">
        {reportList ?
          reportList.map(({reportDate, reportName, reportFormat, isGenerated}, index) => 
            <div className="flex" key={index}>
              <div className="w-2/5 border-1 p-2">
                {reportName}
              </div>
              <div className="w-1/5 border-1 p-2">
                {reportDate}
              </div>
              <div className="w-1/5 border-1 p-2">
                {reportFormat}
              </div>
              <div className="w-1/5 border-1 p-2">
                {isGenerated ?
                  <Button type="link" >Download</Button>
                
                  :
                
                  <Button type="link" className="!text-light-slate-10" disabled >Generating</Button>
                }
              </div>
            </div>
          )
          
          :
          
          <Text>
            Currently there are no reports
          </Text>
        }
      </div>
    </Card>
  );
};

export default ReportsHistory;