import Link from "next/link";
import Text from "components/atoms/Typography/text";

const RepoNotIndexed = () => {
  return (
    <Text>
      The repository is not currently being indexed by OpenSauced. <br />
      <Link href="https://github.com/open-sauced/feedback/discussions/2" target="_blank">
        <span className="text-orange-600 cursor-pointer">Visit our feedback discussion</span>
      </Link>{" "}
      to request this repository be added.
    </Text>
  );
};

export default RepoNotIndexed;
