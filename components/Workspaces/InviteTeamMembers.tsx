import { FaMailBulk } from "react-icons/fa";
import Button from "components/atoms/Button/button";

interface InviteTeamMembersProps {
  onInviteTeamMembers: () => void;
}

export const InviteTeamMembers = ({ onInviteTeamMembers }: InviteTeamMembersProps) => {
  return (
    <form className="grid grid-cols-1 pt-6 gap-6 w-full">
      <div className="flex justify-between items-center gap-6">
        <div>
          <h2>Invite members</h2>
          <p className="prose prose-sm">Add and remove workspace members, or change their roles.</p>
        </div>
        <Button
          variant="primary"
          className="flex gap-2.5 items-center cursor-pointer w-min mt-2 sm:mt-0"
          onClick={(event) => {
            event.preventDefault();
            onInviteTeamMembers();
          }}
        >
          {/* TODO find right mail icon */}
          <FaMailBulk size={22} />
          <span>Send Invites</span>
        </Button>
      </div>
    </form>
  );
};

export default InviteTeamMembers;
