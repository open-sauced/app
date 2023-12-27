import { AiOutlineClose } from "react-icons/ai";
import Button from "components/atoms/Button/button";
import RepoCardProfile, { RepoCardProfileProps } from "../RepoCardProfile/repo-card-profile";

interface SuggestedRopsitoryProps {
  data: RepoCardProfileProps;
  onAddRepo?: (repo: string) => void;
  onRemoveRepo?: (repoId: number) => void;
  loadingData?: {
    repoName: string;
    isLoading: boolean;
    isAddedFromCart: boolean;
  };
  isAdded: boolean;
}
const SuggestedRepository = ({ data, onAddRepo, onRemoveRepo, loadingData, isAdded }: SuggestedRopsitoryProps) => {
  const handleAddRepo = (repo) => onAddRepo && onAddRepo(`${repo.orgName}/${repo.repoName}`);
  const handleRemoveRepo = (repoId) => onRemoveRepo && onRemoveRepo(repoId);
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
        className="border border-light-slate-6 shadow-input w-fit gap-2"
        onClick={() => {
          isAdded ? handleRemoveRepo(data.id) : handleAddRepo(data);
        }}
      >
        {isAdded ? (
          <>
            <span>Remove</span>
            <AiOutlineClose className="text-sm text-light-slate-10" />
          </>
        ) : (
          "Add to Page"
        )}
      </Button>
    </div>
  );
};

export default SuggestedRepository;
