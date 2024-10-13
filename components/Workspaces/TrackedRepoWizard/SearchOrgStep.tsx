import { useRef } from "react";
import { useEffectOnce } from "react-use";
import { Avatar } from "components/atoms/Avatar/avatar-hover-card";
import Search from "components/atoms/Search/search";

interface SearchOrgStepProps {
  onSelectOrg: (org: string) => void;
  onSearch: (search: string) => void;
  orgs: Set<string>;
}

export const SearchOrgStep = ({ onSelectOrg, onSearch, orgs }: SearchOrgStepProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  useEffectOnce(() => {
    (formRef.current?.querySelector('[name="query"]') as HTMLInputElement)?.focus();
  });

  return (
    <div className="flex flex-col gap-4 h-96 max-h-96">
      <form
        ref={formRef}
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Search
          placeholder="Search your organizations"
          labelText="Search your organizations"
          className="w-full"
          name="query"
          onChange={(event) => {
            onSearch(event);
          }}
          onSelect={onSelectOrg}
          suggestions={[...orgs].map((repo) => {
            const [owner] = repo.split("/");

            return {
              key: repo,
              node: (
                <div key={repo} className="flex items-center gap-2">
                  <Avatar contributor={owner} size="xsmall" />
                  <span>{repo}</span>
                </div>
              ),
            };
          })}
        />
      </form>
    </div>
  );
};
