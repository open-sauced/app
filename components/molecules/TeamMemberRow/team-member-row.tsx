import clsx from "clsx";
import Avatar from "components/atoms/Avatar/avatar";
import { AiOutlineCaretDown } from "react-icons/ai";

interface TeamMemberRowProps {
  className?: string;
  name: string;
  avatarUrl: string;
  role: "admin" | "editor" | "viewer" | "pending";
}

const TeamMemberRow  = ({ className, name, avatarUrl, role }: TeamMemberRowProps) => {

  const mapRoleToText: Record<TeamMemberRowProps["role"], string> = {
    admin: "Admin",
    editor: "can edit",
    viewer: "can view",
    pending: "Pending"
  };

  return(
    <div className={`flex justify-between items-center ${className && className} ${role == "pending" && "text-light-slate-10"}`}>
      <div className="flex items-center">
        <Avatar size={40} isCircle avatarURL={avatarUrl} />
        <p className="ml-3">{name}</p>
      </div>
      <div>
        <div className="flex items-center gap-3">
          {mapRoleToText[role]} {role != "pending" && <AiOutlineCaretDown />}
        </div>
      </div>
    </div>
  );

};
export default TeamMemberRow;
