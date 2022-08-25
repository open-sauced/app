import useContributorData from "lib/hooks/useContributorData"
import ContributorCard from "../ContributorCard/contributor-card";
const Contributors = (): JSX.Element =>{
    const data = useContributorData();
    const array = Array.apply(null, Array(9))
return (
  <div className="w-full grid grid-cols-automobile  md:grid-cols-autodesktop gap-3">
    {array.map((contributor, index) => (
      <ContributorCard key={index} className="" contributor={{ ...data }} />
    ))}
  </div>
);
}
export default Contributors 