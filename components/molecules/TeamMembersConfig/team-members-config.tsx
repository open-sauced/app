import Button from "components/atoms/Button/button";
import Search from "components/atoms/Search/search";
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
    <div className={` ${className && className}`}>
      <h2 className="text-lg font-medium tracking-wide">Add Team Members</h2>
      <div className="flex items-center gap-5 mt-3">
        <Search placeholder="Search Email" name="search" className="flex-1 text-base" />
        <Button variant="primary" className="flex items-center h-7">
          Send Invite
        </Button>
      </div>
      <div className="mt-7">
        {members.map((member) => (
          <TeamMemberRow key={member.name + member.avatarUrl} className="mb-4" {...member} />
        ))}
      </div>
    </div>
  );
};

export default TeamMembersConfig;
