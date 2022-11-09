import { useState, useEffect, useRef } from "react";
import { CSVLink } from "react-csv";
import { useSWRConfig } from "swr";
import { useRouter } from "next/router";

import Button from "components/atoms/Button/button";

import { Report } from "interfaces/report-type";
import apiFetcher from "lib/hooks/useSWR";

interface CSVDownloadProps {
  report: Report;
  repositories?: number[];
}

const CSVDownload = ({ report, repositories }: CSVDownloadProps) => {
  const csvRef = useRef<any>();
  const [data, setData] = useState<any[] | null>(null);
  const [generating, setGenerating] = useState(false);
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const { filterName: topic } = router.query;  
  const selectedFilter = report.reportName;

  useEffect(() => {
    if (Array.isArray(data) && csvRef.current && csvRef.current.link) {
      setTimeout(() => {
        csvRef.current.link.click();
        setData(null);
      });
    }
  }, [data]);

  const onDownload = async() => {
    const key = `${topic}/contributions?filter=${selectedFilter}&limit=100${repositories && repositories.length > 0 ? `&repoIds=${repositories?.join(",")}` : ""}`;

    try {
      setGenerating(true);
      const result: { data: any[], meta: Meta } = await mutate(key, apiFetcher(key));
    
      setData(result.data);
    } catch(e) {
    } finally {
      setGenerating(false);
    }
  };

  return <>
    { data ? <CSVLink data={data} ref={csvRef}></CSVLink> : "" }
    <Button type="link" onClick={onDownload} disabled={generating}>{generating ? "Loading" : "Download"}</Button>
  </>;
};

export default CSVDownload;