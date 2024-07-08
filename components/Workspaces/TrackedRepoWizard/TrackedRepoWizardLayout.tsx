import { FaArrowLeft } from "react-icons/fa6";
import { MdOutlineClose } from "react-icons/md";
import Card from "components/atoms/Card/card";
import Button from "components/shared/Button/button";

interface TrackedRepoWizardLayoutProps {
  onCancel: () => void;
  onCloseModal: () => void;
  trackedReposCount: number;
  onAddToTrackingList: () => void;
  children: React.ReactNode;
}

export const TrackedRepoWizardLayout = ({
  trackedReposCount,
  onAddToTrackingList,
  onCancel,
  onCloseModal,
  children,
}: TrackedRepoWizardLayoutProps) => {
  return (
    <Card className="!p-0 sm:w-96 md:w-max max-w-3xl mx-1">
      {/* Using !p-0 for now as the Card component has explicit padding of p-3. We can revisit. */}
      <section className="flex w-full justify-between">
        <button
          className="flex gap-1 items-center ml-4 mt-4 border border-transparent"
          onClick={() => {
            onCancel();
          }}
        >
          <FaArrowLeft /> back
        </button>

        <button onClick={onCloseModal} className="mr-4 mt-4">
          <MdOutlineClose className="w-6 h-6" />
        </button>
      </section>
      <div className="flex flex-col justify-between gap-4">
        <div className="px-4 pt-2">
          <h2 className="font-semibold mb-4">Add repositories to track</h2>
          {children}
        </div>
        <div className="flex gap-4 items-center justify-end border-t-1 p-4">
          <span>
            <span className="font-semibold">{trackedReposCount}</span> Selected repositories
          </span>
          <Button
            variant="primary"
            onClick={() => {
              onAddToTrackingList();
            }}
            disabled={trackedReposCount === 0}
          >
            Add to tracking list
          </Button>
        </div>
      </div>
    </Card>
  );
};
