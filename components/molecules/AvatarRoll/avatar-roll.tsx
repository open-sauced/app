import Avatar from "components/atoms/Avatar/avatar";

interface AvatarRollProps {
  avatarCount?: number;
}

const AvatarRoll = ({ avatarCount = 9 }: AvatarRollProps):JSX.Element => {
  const rollCount = Array.apply(null, Array(avatarCount));

  return (
    <div className="flex gap-3 items-center">
      {rollCount.map((roll, index) => (
        <div
          key={index}
          className={ 
            `${index === 0 ? "scale-50" : ""} ` +
            `${index === 1 ? "scale-75" : ""}` +
            `${index === 2 ? "scale-100" : ""}` +
            `${index === 3 ? "scale-110" : ""}` +
            `${index === 4 ? "scale-110" : ""}` +
            `${index === 5 ? "scale-110" : ""}` +
            `${index === 6 ? "scale-100" : ""} ` +
            `${index === 7 ? "scale-75" : ""}` +
            `${index === 8 ? "scale-50" : ""}`
          }
        >
          <Avatar
            size="lg"
            avatarURL="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
          />
        </div>
      ))}
    </div>
  );
};

export default AvatarRoll;
