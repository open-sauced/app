import Default from "../components/organisms/Default/default";
import Footer from "../components/organisms/footer/footer";
import Header from "../components/organisms/header/header";
import Nav from "../components/organisms/toolist/nav";
import Tool from "../components/organisms/ToolsDisplay/tools-display";
import TopNav from "../components/organisms/TopNav/top-nav";

const storyConfig = {
  title: "Organisms"
};

export default storyConfig;

export const DefaultOrganism = () => <Default />;
export const FooterOrganism = () => <Footer />;
export const HeaderOrganism = () => <Header />;
export const ToolNavOrganism = () => <Nav />;
export const ToolsDisplayOrganism = () => <Tool />;
export const TopNavOrganism = () => <TopNav />;