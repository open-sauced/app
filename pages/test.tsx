import MetricCard from "components/Graphs/KPI/MetricCard";
import ProfileLayout from "layouts/profile";

// Test to see what the cards look like without having to render extra data from tables
// Will be using 'open-sauced/app' as the main repo
// Stars per day & Forks per day
export default function TestPage() {
  return (
    <ProfileLayout>
      <MetricCard repository="open-sauced/app" range={30} variant="stars" />
      <MetricCard repository="open-sauced/app" range={30} variant="forks" />
    </ProfileLayout>
  );
}
