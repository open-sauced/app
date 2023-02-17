import Image from "next/image";

import Avatar from "components/atoms/Avatar/avatar";
import React, { useEffect, useState } from "react";
import { AiOutlineGithub } from "react-icons/ai";
import { TbMessages } from "react-icons/tb";
import CardHorizontalBarChart from "../CardHorizontalBarChart/card-horizontal-bar-chart";
import { getFormattedDate } from "lib/utils/date-utils";
import { fetchGithubPRInfo } from "lib/hooks/fetchGithubPRInfo";
import { generateApiPrUrl } from "lib/utils/github";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";

import InvalidImage from "img/404 Image.svg";

interface PullRequestHighlightCardProps {
  prLink: string;
}
const PullRequestHighlightCard = ({ prLink }: PullRequestHighlightCardProps) => {
  const { isValidUrl, apiPaths } = generateApiPrUrl(prLink);
  const [PRInfo, setPRInfo] = useState<GhPRInfoResponse>();
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  const fetchGhPullRequest = async (orgName: string | null, repoName: string | null, issueId: string | null) => {
    setLoading(true);
    const { data, isError } = await fetchGithubPRInfo(orgName, repoName, issueId);
    setLoading(false);
    if (data) {
      setPRInfo(data);
    }
    if (isError) {
      setError(true);
    }
  };

  useEffect(() => {
    const { orgName, repoName, issueId } = apiPaths;
    fetchGhPullRequest(orgName, repoName, issueId);
  }, []);
  return (
    <>
      {isLoading && <SkeletonWrapper height={250} />}
      {isValidUrl && isError && (
        <div className="relative w-full h-[390px]">
          <Image src={InvalidImage} fill alt="invalid url image" />
        </div>
      )}
      {PRInfo && (
        <div className="flex max-w-[45rem] flex-1 flex-col gap-8 lg:gap-16 bg-white pt-8 pb-4">
          <div className="lg:px-8 px-3 flex justify-between">
            <div className="flex flex-col gap-2">
              <span className="text-sm font-normal">{`${PRInfo.head.user.login}/${PRInfo.head.repo.name}`}</span>
              <h3 className="text-base lg:text-3xl font-semibold flex items-center gap-1">
                <span className="text-light-slate-9 font-normal">{`#${PRInfo.number}`}</span> <p>{PRInfo.title}</p>
              </h3>
              <div className="flex gap-2 text-light-slate-9 text-sm">
                <TbMessages className="text-lg" />
                {PRInfo.comments} comment
              </div>
            </div>
            <div className="md:hidden">
              <Avatar isCircle size="base" avatarURL={PRInfo.user.avatar_url} />
            </div>
            <div className="hidden md:inline-flex">
              <Avatar isCircle size="lg" avatarURL={PRInfo.user.avatar_url} />
            </div>
          </div>

          <div>
            <div className="lg:px-8 px-3 flex justify-between items-center">
              <div className="flex text-sm items-center gap-2">
                <Avatar isCircle size="sm" avatarURL={PRInfo?.user.avatar_url} />
                <p className="text-light-slate-9 font-normal">
                  <span className="text-light-slate-12 font-semibold">{PRInfo.user.login}</span> opened on{" "}
                  {getFormattedDate(PRInfo.created_at)}
                </p>
              </div>
              <AiOutlineGithub />
            </div>
            <div className="flex flex-col mt-3 gap-4">
              <div>
                <CardHorizontalBarChart
                  languageList={[{ languageName: "JavaScript", percentageUsed: 100 }]}
                  withDescription={false}
                />
              </div>
              <div className="lg:px-8 px-3">
                <p className="font-semibold">
                  {PRInfo?.title}· Issue {`#${PRInfo.number}`} · {`${PRInfo.head.user.login}/${PRInfo.head.repo.name}`}
                </p>
                <span>GITHUB.COM</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(PullRequestHighlightCard);
