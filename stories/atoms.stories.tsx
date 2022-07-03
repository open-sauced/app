import Card from "../components/atoms/Card/card";
import Text from "../components/atoms/Typography/text";
import StrongText from "../components/atoms/Typography/strong-text";

const storyConfig = {
    title: "Atoms"
};

export default storyConfig;

export const CardAtom = () => <Card><div>Test</div></Card>;
export const TextAtom = () => <Text><div>Test</div></Text>;
export const StrongTextAtom = () => <StrongText><div>Test</div></StrongText>;