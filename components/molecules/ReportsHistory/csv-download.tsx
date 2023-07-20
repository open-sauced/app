import { useState, useEffect, useRef } from "react";
import { CSVLink } from "react-csv";
import { useSWRConfig } from "swr";

import Button from "components/atoms/Button/button";

import { Report } from "interfaces/report-type";
import publicApiFetcher from "lib/utils/public-api-fetcher";

interface CSVDownloadProps {
  report: Report;
  repositories?: number[];
}

interface PaginatedResponse {
  readonly data: DbRepoPR[];
  readonly meta: Meta;
}

const CSVDownload = ({ report, repositories }: CSVDownloadProps) => {
  const csvRef = useRef<any>();
  const [data, setData] = useState<any[] | null>(null);
  const [generating, setGenerating] = useState(false);
  const { mutate } = useSWRConfig();
  const selectedFilter = report.reportName;

  useEffect(() => {
    if (Array.isArray(data) && csvRef.current && csvRef.current.link) {
      setTimeout(() => {
        csvRef.current.link.click();
        setData(null);
      });
    }
  }, [data]);

  const onDownload = async () => {
    const query = new URLSearchParams();
    query.set("filter", selectedFilter);
    query.set("limit", "100");
    query.set("range", "30");

    if (repositories && repositories.length > 0) {
      query.set("repoIds", repositories.join(","));
    }

    const key = `prs/search?${query.toString()}`;

    try {
      setGenerating(true);
      // @ts-ignore
      const result: PaginatedResponse = await mutate(key, publicApiFetcher(key));

      setData(result.data);
    } catch (e) {
    } finally {
      setGenerating(false);
    }
  };

  return (
    <>
      {data ? <CSVLink data={data} ref={csvRef}></CSVLink> : ""}
      <Button variant="link" onClick={onDownload} disabled={generating}>
        {generating ? "Loading" : "Download"}
      </Button>
    </>
  );
};

export default CSVDownload;
