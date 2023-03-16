import Avatar from "components/atoms/Avatar/avatar";
import { AiOutlineCaretDown } from "react-icons/ai";
import pendingImg from "img/icons/fallback-image-disabled-square.svg";
import { useState } from "react";
import Selector from "components/atoms/Selector/selector";

interface TeamMemberRowProps {
  className?: string;
  name: string;
  avatarUrl: string;
  role: "admin" | "editor" | "viewer" | "pending";
}

const TeamMemberRow  = ({ className, name, avatarUrl, role }: TeamMemberRowProps) => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pending = role == "pending";

  const mapRoleToText: Record<TeamMemberRowProps["role"], string> = {
    admin: "Admin",
    editor: "can edit",
    viewer: "can view",
    pending: "Pending"
  };

  return(
    <div className={`flex justify-between items-center ${className && className} ${pending && "text-light-slate-10"}`}>
      <div className="flex items-center">
        <Avatar size={40} isCircle avatarURL={pending ? pendingImg : avatarUrl} />
        <p className="ml-3">{name}</p>
      </div>
      <div>
        <div className="flex items-center gap-3">
          {mapRoleToText[role]} {!pending && <AiOutlineCaretDown onClick={() => {setIsMenuOpen(!isMenuOpen)}} />}
        </div>
        { !pending && isMenuOpen && (
          // <div className="absolute bg-white rounded-md shadow-md w-40">
          // </div>
          <Selector filterOptions={["Admin", "can edit", "can view"]} selected={mapRoleToText[role]} variation="check" />
        )}

      </div>
    </div>
  );

};
export default TeamMemberRow;
