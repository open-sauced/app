import { useState } from "react";
import Button from "components/shared/Button/button";
import Search from "components/atoms/Search/search";
import { useToast } from "lib/hooks/useToast";
import { getAvatarByUsername } from "lib/utils/github";
import WorkspaceMemberRow from "../WorkspaceMemberRow/workspace-member-row";

interface WorkspaceMembersConfigProps {
  className?: string;
  members: WorkspaceMember[];
  onAddMember: (username: string) => Promise<WorkspaceMember> | undefined;
  onDeleteMember: (memberId: string) => void;
  onUpdateMember: (memberId: string, role: WorkspaceMemberRole) => Promise<any>;
}

const WorkspaceMembersConfig = ({
  className,
  members,
  onAddMember,
  onDeleteMember,
  onUpdateMember,
}: WorkspaceMembersConfigProps) => {
  const [validInput, setValidInput] = useState(false);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = async (value: string) => {
    setUsername(value);

    setValidInput(!!value && value.length > 3);
  };

  const handleAddMember = async () => {
    const memberExists = members.find((member) => member.member.login.toLowerCase() === username.toLowerCase());

    if (memberExists) {
      toast({ description: "Member already exists", variant: "danger" });
      return;
    }
    setLoading(true);
    const res = await onAddMember(username);
    setLoading(false);
    setUsername("");
    if (res) {
      toast({ description: "Member added successfully", variant: "success" });
    } else {
      toast({ description: "Error: The user entered was not found on OpenSauced!", variant: "danger" });
    }
  };

  return (
    <div className={` ${className && className}`}>
      <div>
        <h2 className="flex gap-1 font-medium mb-2 text-md">Workspace Members</h2>
      </div>
      <div className="flex justify-between">
        <div className="w-1/2 max-w-md">
          <Search
            isLoading={loading}
            value={username}
            onChange={(value) => handleChange(value)}
            placeholder="Enter username"
            name="search"
            className="flex-1 text-base"
          />
        </div>
        <Button onClick={handleAddMember} disabled={!validInput} variant="primary" className="w-max h-max">
          Add Member
        </Button>
      </div>
      <div className="mt-7">
        {members.map((member) => (
          <WorkspaceMemberRow
            key={member.id}
            className="mb-4"
            onUpdate={onUpdateMember}
            onDelete={onDeleteMember}
            {...member}
            name={member.member.login}
            email={member.member.email}
            avatarUrl={getAvatarByUsername(member.member.login)}
            pending={!member.member.is_open_sauced_member}
            role={member.role as unknown as WorkspaceMemberRole}
          />
        ))}
      </div>
    </div>
  );
};

export default WorkspaceMembersConfig;
