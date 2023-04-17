import Button from "components/atoms/Button/button";
import Search from "components/atoms/Search/search";
import TeamMemberRow from "../TeamMemberRow/team-member-row";
import { useState } from "react";
import { validateEmail } from "lib/utils/validate-email";
import { useToast } from "lib/hooks/useToast";

interface TeamMembersConfigProps {
  className?: string;
  members: TeamMemberData[];
  onAddMember: Function;
  onDeleteMember: Function;
  onUpdateMember: Function;
}

export interface TeamMemberData {
  id: number;
  insight_id: number;
  user_id?: number;
  name: string;
  access: "pending" | "admin" | "edit" | "view";
  avatarUrl: string;
  email?: string;
}

const TeamMembersConfig = ({
  className,
  members,
  onAddMember,
  onDeleteMember,
  onUpdateMember
}: TeamMembersConfigProps) => {
  const [validInput, setValidInput] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = async (value: string) => {
    setEmail(value);

    setValidInput(!!validateEmail(value));
  };

  const handleAddMember = async () => {
    const memberExists = members.find((member) => member.email === email);

    if (memberExists) {
      toast({ description: "Member already exists", variant: "danger" });
      return;
    }
    setLoading(true);
    const res = await onAddMember(email);
    setLoading(false);
    setEmail("");
    if (res) {
      toast({ description: "Member added successfully", variant: "success" });
    } else {
      toast({ description: "An error occurred!", variant: "danger" });
    }
  };

  return (
    <div className={` ${className && className}`}>
      <h2 className="text-lg font-medium tracking-wide">Add Team Members</h2>
      <div className="flex items-center gap-5 mt-3">
        <Search
          isLoading={loading}
          value={email}
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
        {members.map((member) => (
          <TeamMemberRow
            onUpdate={onUpdateMember}
            onDelete={onDeleteMember}
            key={member.id}
            className="mb-4"
            {...member}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamMembersConfig;
