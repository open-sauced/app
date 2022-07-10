import Avatar from "../components/atoms/Avatar/avatar";
import Card from "../components/atoms/Card/card";
import Text from "../components/atoms/Typography/text";
import StrongText from "../components/atoms/Typography/strong-text";
import ContextThumbnail from "../components/atoms/ContextThumbnail/context-thumbnail";

const storyConfig = {
  title: "Atoms"
};

export default storyConfig;

export const AvatarAtom = () => <Avatar size={40} avatarURL="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"></Avatar>;
export const CardAtom = () => <Card><div>Test</div></Card>;
export const TextAtom = () => <Text><div>Test</div></Text>;
export const StrongTextAtom = () => <StrongText><div>Test</div></StrongText>;
export const ContextThumbnailAtom = () => <ContextThumbnail size={96}></ContextThumbnail>;