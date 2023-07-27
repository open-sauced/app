import FavoriteRepoCard, { FavoriteRepoCardProps } from "../FavoriteRepoCard/favorite-repo-card";

interface FavoriteReposProps {
  /** Limited to maximum of 3 items to show. */
  repos: FavoriteRepoCardProps[];
}

const FavoriteRepos = ({ repos }: FavoriteReposProps) => {
  return (
    <div>
      <span className="text-xl text-light-slate-12">Favorite Repositories</span>
      <div className="flex gap-4 mt-2">
        {repos.map((repo) => (
          <FavoriteRepoCard
            key={repo.name}
            name={repo.name}
            owner={repo.owner}
            avatarURL={repo.avatarURL}
            topic={repo.topic}
            userPage={repo.userPage}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoriteRepos;
