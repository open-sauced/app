import { BsFillCircleFill } from "react-icons/bs";
import Skeleton from "react-loading-skeleton";
import { useEffect, useRef, useState } from "react";
import Card from "components/atoms/Card/card";
import { MostUsedLanguageStat } from "lib/hooks/api/useMostLanguages";
import { ContributorType, ContributorTypeFilter } from "../shared/contributor-type-filter";

export interface MostUsedLanguagesGraphProps {
  data: MostUsedLanguageStat[];
  setContributorType: (type: ContributorType) => void;
  contributorType: ContributorType;
  isLoading: boolean;
  hasError: boolean;
}

const ContainerCard = ({
  children,
  setContributorType,
  contributorType,
}: {
  children: React.ReactNode;
  setContributorType: (type: ContributorType) => void;
  contributorType: ContributorType;
}) => (
  <Card className="p-5">
    <div className="flex flex-col gap-6">
      <h2 className="pb-1 font-medium text-lg tracking-tight">Most used languages</h2>
      <div className="w-max">
        <ContributorTypeFilter setContributorType={setContributorType} contributorType={contributorType} />
      </div>
      {children}
    </div>
  </Card>
);

export const MostUsedLanguagesGraph = ({
  data,
  setContributorType,
  contributorType,
  isLoading,
  hasError,
}: MostUsedLanguagesGraphProps) => {
  const colors = [
    "hsl(53, 91%, 59%)",
    "hsl(204, 100%, 40%)",
    "hsl(14, 98%, 49%)",
    "hsl(267, 36%, 37%)",
    "hsl(17, 100%, 50%)",
  ];
  const lastItem = data.length > 0 ? data.length - 1 : 0;
  const sortedLanguages = data.sort((a, b) => b.value - a.value);
  const languagesRef = useRef<HTMLUListElement>(null);
  const [language, setLanguage] = useState<string | null>();
  const totalLinesOfCode = data.reduce((total, { value }) => total + value, 0);

  useEffect(() => {
    if (language) {
      const languageElement = languagesRef.current?.querySelector(`[data-language="${language}"]`);
      if (languageElement) {
        languageElement.classList.add("font-semibold");
      }
    }
  }, [language]);

  if (hasError) {
    return (
      <ContainerCard setContributorType={setContributorType} contributorType={contributorType}>
        <div className="flex h-3 place-content-center">
          <div className="rounded-lg bg-slate-100 w-full" />
        </div>
        <p className="text-center">Error loading data</p>
      </ContainerCard>
    );
  }

  return (
    <ContainerCard setContributorType={setContributorType} contributorType={contributorType}>
      <div className="flex h-3 place-content-center">
        {isLoading ? (
          <div className="loading rounded-lg w-max" style={{ width: "100%" }}>
            <span className="sr-only">loading most used languages graph</span>
          </div>
        ) : (
          <>
            {sortedLanguages.length > 0 ? (
              sortedLanguages.map((item, index) => {
                const percentage = Math.round((item.value / totalLinesOfCode) * 100);
                return (
                  <button
                    aria-label={`${item.name} is ${percentage}% of the most used languages for contributors in your list`}
                    key={item.name}
                    data-language={item.name}
                    className={`${index === 0 ? "rounded-l-lg" : ""} ${
                      index === lastItem ? "rounded-r-lg" : ""
                    } transform hover:scale-110 transition-transform hover:z-10`}
                    style={{ backgroundColor: colors[index], width: `${percentage}%` }}
                    onMouseOver={(event) => {
                      const { language } = event.currentTarget.dataset;
                      setLanguage(language);
                    }}
                    onMouseOut={() => {
                      setLanguage(null);
                    }}
                    onFocus={(event) => {
                      const { language } = event.currentTarget.dataset;
                      setLanguage(language);
                    }}
                    onBlur={() => {
                      setLanguage(null);
                    }}
                  />
                );
              })
            ) : (
              <div className="rounded-lg bg-slate-100 w-full" />
            )}
          </>
        )}
      </div>

      {isLoading ? (
        <Skeleton height={24} count={5} className="mt-4 mb-4" />
      ) : (
        <ul ref={languagesRef} className="grid grid-cols-1 content-center">
          {sortedLanguages.length > 0 ? (
            sortedLanguages.map((item, index) => {
              const percentage = Math.round((item.value / totalLinesOfCode) * 100);

              return (
                <li
                  key={item.name}
                  className={`flex justify-between pt-4 pb-4 ${
                    index === lastItem ? "" : "border-b-1 border-slate-100"
                  }`}
                >
                  <span
                    className={`flex gap-2 items-center ${language === item.name ? "text-black" : "text-slate-700"} ${
                      language === item.name ? "font-semibold" : ""
                    }`}
                  >
                    <BsFillCircleFill size={11} style={{ fill: colors[index] }} />
                    {item.name}
                  </span>
                  <span
                    className={`${language === item.name ? "text-black" : "text-slate-600"} ${
                      language === item.name ? "font-semibold" : ""
                    }`}
                  >
                    {percentage}%
                  </span>
                </li>
              );
            })
          ) : (
            <p className="text-center">There is no language data</p>
          )}
        </ul>
      )}
    </ContainerCard>
  );
};
