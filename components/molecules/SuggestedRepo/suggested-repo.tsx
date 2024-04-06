import Button from "components/atoms/Button/button";
import RepoCardProfile, { RepoCardProfileProps } from "../RepoCardProfile/repo-card-profile";

interface SuggestedRopsitoryProps {
  data: RepoCardProfileProps;
  onAddRepo?: (repo: string) => void;
  loadingData?: {
    repoName: string;
    isLoading: boolean;
    isAddedFromCart: boolean;
  };
}
const SuggestedRepository = ({ data, onAddRepo, loadingData }: SuggestedRopsitoryProps) => {
  return (
    <div className="flex justify-between flex-col xs:flex-row xs:items-start">
      <RepoCardProfile {...data} />
      <Button
        disabled={
          `${data.orgName}/${data.repoName}` === loadingData?.repoName &&
          loadingData?.isLoading &&
          !loadingData?.isAddedFromCart
        }
        loading={
          `${data.orgName}/${data.repoName}` === loadingData?.repoName &&
          loadingData?.isLoading &&
          !loadingData?.isAddedFromCart
        }
        variant="text"
        className="border border-light-slate-6 shadow-input w-fit"
        onClick={() => onAddRepo && onAddRepo(`${data.orgName}/${data.repoName}`)}
      >
        Add to Page
      </Button>
    </div>
  );
};

export default SuggestedRepository;
