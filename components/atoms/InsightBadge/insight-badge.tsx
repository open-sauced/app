import Text from "components/atoms/Typography/text";

interface BadgeProps {
  isPublic: boolean;
}

const Badge = ({ isPublic }: BadgeProps): JSX.Element => {
  return (
    <div className="inline-flex border h-8 border-light-slate-6 rounded-3xl bg-light-slate-3 px-2.5 py-1">
      <span className="text-light-slate-11 leading-normal">{!!isPublic ? "Public" : "Private"}</span>
    </div>
  );
};

export default Badge;
