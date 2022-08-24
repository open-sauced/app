import Avatar from "components/atoms/Avatar/avatar";

interface AvatarRollProps {
  avatarCount?: number;
}

const AvatarRoll = ({ avatarCount = 9 }: AvatarRollProps): JSX.Element => {
  const rollCount = Array.apply(null, Array(avatarCount));

  return (
    <div className="flex gap-3 items-center">
      {rollCount.map((roll, index) => (
        <Avatar
          key={index}
          size={
            index === 0 || index === 8
              ? 24
              : index === 1 || index === 7
                ? 32
                : index === 2 || index === 6
                  ? 40
                  : index === 3 || index === 5
                    ? 44
                    : 48
          }
          avatarURL="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
        />
      ))}
    </div>
  );
};

export default AvatarRoll;
