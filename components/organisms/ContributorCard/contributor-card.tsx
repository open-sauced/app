import Card from "components/atoms/Card/card";
import CardLineChart from "components/molecules/CardLineChart/card-line-chart";
import CardProfile from "components/molecules/CardProfile/card-profile";
import CardRepoList from "components/molecules/CardRepoList/card-repo-list";
import useContributorCard from "lib/hooks/useContributorCard";

const ContributorCard = () => {
  const { profile, repoList, lineChart } = useContributorCard();

  return (
    <Card>
      <>
        <CardProfile {...profile} />
        <CardLineChart option={lineChart}/>
        <CardRepoList repoList={repoList}/>
      </>
    </Card>
  );
};

export default ContributorCard;