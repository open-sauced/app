import Avatar from "components/atoms/Avatar/avatar";
import Button from "components/atoms/Button/button";
import Search from "components/atoms/Search/search";
import { AiOutlineCaretDown } from "react-icons/ai";
import TeamMemberRow from "../TeamMemberRow/team-member-row";

interface TeamMembersConfigProps {
  className?: string;
  members: TeamMemberData[];
}

export interface TeamMemberData {
  name: string;
  avatarUrl: string;
  role: "admin" | "editor" | "viewer" | "pending";
}

const TeamMembersConfig = ({ className, members }: TeamMembersConfigProps) => {

  return (
    <div className={`max-w-xl ${className && className}`}>
      <h2 className="font-medium text-base">Add Team Members</h2>
      <div className="flex justify-between items-center">
        <Search name="search" className="w-4/5" />
        <Button variant="primary" className="h-7 flex items-center">Send Invite</Button>
      </div>
      <div className="mt-7">
        {members.map(member => (
          <TeamMemberRow key={member.name + member.avatarUrl} className="mb-4" {...member} />
        ))}
      </div>
    </div>
  );
};

export default TeamMembersConfig;
