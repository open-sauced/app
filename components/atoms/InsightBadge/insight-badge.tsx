import Text from "components/atoms/Typography/text";;

interface BadgeProps {
    isPublic: boolean
}

const Badge = ({ isPublic }: BadgeProps): JSX.Element => {
  return (
    <div className="inline-flex border border-light-slate-6 rounded-[26px] bg-light-slate-3 px-2.5 py-1">
      <span className="text-sm text-light-slate-11 leading-none">
        {!!isPublic ? "Public" : "Private"}
      </span>
    </div>
  );
};

export default Badge;
