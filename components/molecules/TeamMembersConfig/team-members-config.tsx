import Button from "components/atoms/Button/button";
import Search from "components/atoms/Search/search";
import TeamMemberRow from "../TeamMemberRow/team-member-row";
import { useState } from "react";
import { validateEmail } from "lib/utils/validate-email";

interface TeamMembersConfigProps {
  className?: string;
  members: TeamMemberData[];
  onAddmember: Function;
}

export interface TeamMemberData {
  id: string;
  name: string;
  avatarUrl: string;
  access: "admin" | "editor" | "viewer" | "pending";
}

const TeamMembersConfig = ({ className, members, onAddmember }: TeamMembersConfigProps) => {
  const [validInput, setValidInput] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [allMembers, setAllMembers] = useState(members);
  const handleChange = async (value: string) => {
    setEmail(value);
    if (validateEmail(value)) {
      setValidInput(true);
    }
  };

  const handleAddMember = async () => {
    setLoading(true);
    const res = await onAddmember(email);
    setLoading(false);
    if (res) {
      setAllMembers((prev) => [...prev, res]);
    }

    setEmail("");
  };
  return (
    <div className={` ${className && className}`}>
      <h2 className="text-lg font-medium tracking-wide">Add Team Members</h2>
      <div className="flex items-center gap-5 mt-3">
        <Search
          isLoading={loading}
          // value={email}
          onChange={(value) => handleChange(value)}
          placeholder="Enter email address"
          name="search"
          className="flex-1 text-base"
        />
        <Button onClick={handleAddMember} disabled={!validInput} variant="primary" className="flex items-center h-7">
          Send Invite
        </Button>
      </div>
      <div className="mt-7">
        {allMembers.map((member) => (
          <TeamMemberRow key={member.name + member.avatarUrl} className="mb-4" {...member} />
        ))}
      </div>
    </div>
  );
};

export default TeamMembersConfig;
