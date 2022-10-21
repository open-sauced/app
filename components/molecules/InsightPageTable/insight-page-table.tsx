import clsx from "clsx";

import Search from "components/atoms/Search/search";
import Select from "components/atoms/Select/custom-select";
import TableTitle from "components/atoms/TableTitle/table-title";
import Title from "components/atoms/Typography/title";
import { classNames } from "components/organisms/RepositoriesTable/repositories-table";
import { RepoList } from "../CardRepoList/card-repo-list";
import InsightTableRow from "../InsightTableRow/insight-table-row";

interface RepoRowProps {
  repoList: RepoList[]
  members: DbContribution[]
}

interface InsightPageTableProps {

}

const contributors = [
  {
    avatarURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
    initials: "ES",
    alt: "E"
  },
  {
    avatarURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
    initials: "ES",
    alt: "E"
  },
  {
    avatarURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
    initials: "ES",
    alt: "E"
  },
  {
    avatarURL: "",
    initials: "ES",
    alt: "E"
  },
  {
    avatarURL: "",
    initials: "ES",
    alt: "E"
  },
  {
    avatarURL: "",
    initials: "ES",
    alt: "E"
  },
  {
    avatarURL: "",
    initials: "ES",
    alt: "E"
  }
  // casting the array for now to avoid build errors, will be removed when live data are available
] as unknown as DbContribution[];

const selectOptions = [
  { name: "Last updated - ASC", value: "10" },
  { name: "Last updated - DSC", value: "10" },
  { name: "Name - ASC", value: "10" },
  { name: "Name - DSC", value: "10" }
];


const InsightPageTable = ({ repoList }: RepoRowProps) => {

  // to be replaced with real data
  const randonArray = Array.apply(null, Array(6));
  return (
    <div>
      {/* Table title */}
      <div className="flex justify-between h-11 items-center">
        <div className="flex gap-x-4 items-end">
          <Title className="!text-2xl !leading-none !font-medium" level={1}>
            All Insight Pages
          </Title>
        </div>
        <div className="w-full  md:w-3/5 flex gap-x-5 items-center justify-end">
          <Select
            placeholder="Last updated - ASC"
            options={selectOptions}
            className="w-[275px]"
            label="Sort by"
          ></Select>
          <div className="w-58">
            <Search placeholder="Search repositories" className="max-w-full" name={"query"} />
          </div>
        </div>
      </div>

      {/* Table section */}

      <div className="flex flex-col mt-6 rounded-lg overflow-hidden border">

        <div className="hidden md:flex py-4 px-6 bg-light-slate-3 gap-10">
          <div className={clsx(classNames.cols.repository, "!max-w-[190px] ")}>
            <TableTitle text="Insight page"></TableTitle>
          </div>
          <div className={clsx(classNames.cols.activity, "!max-w-[230px] ")}>
            <TableTitle text="Repositories"></TableTitle>
          </div>
          <div className={clsx(classNames.cols.prOverview, "!min-w-[100px] !max-w-[130px] ")}>
            <TableTitle text="avg prs opened"></TableTitle>
          </div>
          <div className={clsx(classNames.cols.prVelocity, "!max-w-[150px] !justify-start")}>
            <TableTitle text="avg pr velocity"></TableTitle>
          </div>
          <div className={clsx(classNames.cols.spam, "!max-w-[180px]")}>
            <TableTitle text="members"></TableTitle>
          </div>
        </div>
        {randonArray.map((a,i) => (
          <InsightTableRow key={`${a}/${Math.random() + i}`} pageName="Open Source Stripe" members={contributors} repositories={repoList} />
        ))}
      </div>

    </div>
  );
};

export default InsightPageTable;
