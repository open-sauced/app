import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { FaUserPlus } from "react-icons/fa";
import useFollowUser from "lib/hooks/useFollowUser";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";

const FollowUser = ({ username }: { username: string }) => {
  const { user, signIn } = useSupabaseAuth();
  const { follow, unFollow, isError } = useFollowUser(username);

  return user ? (
    <DropdownMenuItem className={`rounded-md ${user?.user_metadata?.user_name === username && "hidden"}`}>
      <div onClick={isError ? follow : unFollow} className="flex gap-2.5 py-1 items-center pl-3 pr-7 cursor-pointer">
        <FaUserPlus size={22} />
        <span>
          {!isError ? "Unfollow" : "Follow"} {username}
        </span>
      </div>
    </DropdownMenuItem>
  ) : (
    <DropdownMenuItem className="rounded-md">
      <div onClick={async () => signIn({ provider: "github" })} className="flex gap-2.5 py-1  items-center pl-3 pr-7">
        <FaUserPlus size={22} />
        <span>Follow {username}</span>
      </div>
    </DropdownMenuItem>
  );
};

export default FollowUser;
