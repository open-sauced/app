import Button from "components/atoms/Button/button";
import RepoCardProfile, { RepoCardProfileProps } from "../RepoCardProfile/repo-card-profile";

interface SuggestedRopsitoryProps {
  data: RepoCardProfileProps;
  onAddRepo?: (repo: string) => void;
}
const SuggestedRepository = ({ data, onAddRepo }: SuggestedRopsitoryProps) => {
  return (
    <div className="flex justify-between items-center">
      <RepoCardProfile {...data} />
      <Button variant="text" className="border border-light-slate-6 shadow-input"
        onClick={() => onAddRepo && onAddRepo(`${data.orgName}/${data.repoName}`)}
      >
        Add to Page
      </Button>
    </div>
  );
};

export default SuggestedRepository;
