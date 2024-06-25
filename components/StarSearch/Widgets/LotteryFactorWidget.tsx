import { useEffect, useState } from "react";
import { captureException } from "@sentry/nextjs";
import LotteryFactorChart from "components/Repositories/LotteryFactorChart";
import { useRepositoryLottoFactor } from "lib/hooks/api/useRepositoryLottoFactor";
import { shortenUrl } from "lib/utils/shorten-url";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

interface LotteryFactorWidgetProps {
  repoName: string;
}

const LotteryFactorWidget = ({ repoName }: LotteryFactorWidgetProps) => {
  const longUrl = new URL(`/s/${repoName}?utm=starsearch-workspaces`, BASE_URL).toString();
  const range = 30;
  const { data, error, isLoading } = useRepositoryLottoFactor({ repository: repoName.toLowerCase(), range });
  const [shortUrl, setShortUrl] = useState(longUrl);

  useEffect(() => {
    if (repoName) {
      shortenUrl(longUrl)
        .then((url) => {
          setShortUrl(url);
        })
        .catch(() => {
          captureException(new Error(`Failed to shorten URL for ${repoName}`));
        });
    }
  }, [repoName]);

  if (error) {
    // whether it's a 404 or any other error, we don't want to render the widget
    // StarSearch will handle the error.
    throw error;
  }

  return (
    <div className="grid gap-2">
      <a className="font-semibold" href={shortUrl} style={{ color: "inherit" }} target="_blank">
        {repoName}
      </a>
      <LotteryFactorChart lotteryFactor={data} isLoading={isLoading} error={error} range={range} />
    </div>
  );
};

export default LotteryFactorWidget;
