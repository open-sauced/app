import DevCard from "components/molecules/DevCard/dev-card";
import { GetServerSideProps, NextPage } from "next";

interface CardProps {
  username: string;
}

export const getServerSideProps: GetServerSideProps<CardProps> = async (context) => {
  const username = context?.params?.username as string | undefined;
  if (!username) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      username,
    },
  };
};

const STUB_DATA = {
  username: "foxyblocks",
  name: "Chris Schlensker",
  avatarURL: "https://avatars.githubusercontent.com/u/555044?v=4",
  prs: 2,
  contributions: 57,
  bio: "This is the story all about how my life got flipped turned upside down, and I'd like to take a minute just sit right there, I'll tell you how I became the prince of a town called Bel-Air.",
  activity: "high",
  prVelocity: 102,
} as const;

const Card: NextPage<CardProps> = ({ username }) => {
  return (
    <div>
      <h1>Stub Card Page</h1>
      <DevCard isLoading={false} {...STUB_DATA} />
    </div>
  );
};

export default Card;
