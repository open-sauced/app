import Title from "components/atoms/Typography/title";
import Text from "components/atoms/Typography/text";

const InsightPage = () => {
  return (
    <section className="flex flex-col items-center justify-center w-full py-20">
      <Title className="!text-4xl !leading-none mb-6" level={1}>
        Goodbye World
      </Title>
      <Text className="text-xl">The API is currently offline. This is a static placeholder page.</Text>
    </section>
  );
};

export default InsightPage;
