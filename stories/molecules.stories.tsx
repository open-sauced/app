import AuthSection from '../components/molecules/AuthSection/auth-section';
import FilterCard from '../components/molecules/FilterCard/filter-card';
import HeaderLogo from '../components/molecules/HeaderLogo/header-logo';

export default {
    title: 'Molecules'
}

export const AuthSectionMolecule = () => <AuthSection />
export const FilterCardMolecule = () => <FilterCard filterName='Test'/>
export const TopNavLogoMolecule = () => <HeaderLogo />