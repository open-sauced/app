import { GetServerSidePropsContext } from "next";

const ListIndex = () => {
  return <></>;
};

export function getServerSideProps(context: GetServerSidePropsContext<{ listId: string }>) {
  const { listId } = context.params!;

  return {
    redirect: {
      destination: `/lists/${listId}/overview`,
      permanent: true,
    },
  };
}

export default ListIndex;
