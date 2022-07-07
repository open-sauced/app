import AuthSection from "../components/molecules/AuthSection/auth-section";
import FilterCard from "../components/molecules/FilterCard/filter-card";
import HeaderLogo from "../components/molecules/HeaderLogo/header-logo";

const storyConfig = {title: "Molecules"
};

export default storyConfig;

export const AuthSectionMolecule = () => <AuthSection />;
export const FilterCardMolecule = () => <FilterCard filterName="Test"/>;
export const TopNavLogoMolecule = () => <HeaderLogo />;