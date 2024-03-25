import { CiMail } from "react-icons/ci";
import Button from "components/shared/Button/button";

interface InviteTeamMembersProps {
  onInviteTeamMembers: () => void;
}

export const InviteTeamMembers = ({ onInviteTeamMembers }: InviteTeamMembersProps) => {
  return (
    <form className="grid grid-cols-1 gap-6 w-full">
      <div>
        <h2>Invite members</h2>
        <p className="prose prose-sm">Add and remove workspace members, or change their roles.</p>
      </div>
      <Button
        variant="primary"
        className="place-self-end flex gap-2.5 items-center cursor-pointer w-min mt-2 sm:mt-0"
        onClick={(event) => {
          event.preventDefault();
          onInviteTeamMembers();
        }}
      >
        <CiMail size={22} />
        <span>Send Invites</span>
      </Button>
    </form>
  );
};

export default InviteTeamMembers;
