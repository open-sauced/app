import { BsFillCircleFill } from "react-icons/bs";
import Skeleton from "react-loading-skeleton";
import { useEffect, useRef, useState } from "react";
import Card from "components/atoms/Card/card";
import { ContributorType, ContributorTypeFilter } from "../shared/contributor-type-filter";

export interface MostUsedLanguagesGraphProps {
  data: {
    languages: {
      name: string;
      value: number;
    }[];
  };
  setContributorType: (type: ContributorType) => void;
  contributorType: ContributorType;
  isLoading?: boolean;
}

export const MostUsedLanguagesGraph = ({
  data,
  setContributorType,
  contributorType,
  isLoading = false,
}: MostUsedLanguagesGraphProps) => {
  const colors = [
    "hsl(53, 91%, 59%)",
    "hsl(204, 100%, 40%)",
    "hsl(14, 98%, 49%)",
    "hsl(267, 36%, 37%)",
    "hsl(17, 100%, 50%)",
  ];
  const { languages = [] } = data;
  const lastItem = languages.length > 0 ? languages.length - 1 : 0;
  const sortedLanguages = languages.sort((a, b) => b.value - a.value);
  const languagesRef = useRef<HTMLUListElement>(null);
  const [language, setLanguage] = useState<string | null>();

  useEffect(() => {
    if (language) {
      const languageElement = languagesRef.current?.querySelector(`[data-language="${language}"]`);
      if (languageElement) {
        languageElement.classList.add("font-semibold");
      }
    }
  }, [language]);

  return (
    <Card className="p-5">
      <div className="flex flex-col gap-6">
        <h2 className="pb-1 font-medium text-lg tracking-tight">Most used languages</h2>
        <div className="w-max">
          <ContributorTypeFilter setContributorType={setContributorType} contributorType={contributorType} />
        </div>

        <div className="flex h-3 place-content-center">
          {isLoading ? (
            <div className="loading rounded-lg w-max" style={{ width: "100%" }}>
              <span className="sr-only">loading most used languages graph</span>
            </div>
          ) : (
            <>
              {sortedLanguages.length > 0 ? (
                sortedLanguages.map((item, index) => {
                  return (
                    <button
                      aria-label={`${item.name} is ${item.value}% of the most used languages for contributors in your list`}
                      key={item.name}
                      data-language={item.name}
                      className={`${index === 0 ? "rounded-l-lg" : ""} ${
                        index === lastItem ? "rounded-r-lg" : ""
                      } transform hover:scale-110 transition-transform hover:z-10`}
                      style={{ backgroundColor: colors[index], width: `${item.value}%` }}
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
              sortedLanguages.map((item, index) => (
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
                    {item.value}%
                  </span>
                </li>
              ))
            ) : (
              <p className="text-center">There is no language data</p>
            )}
          </ul>
        )}
      </div>
    </Card>
  );
};
