import React from 'react';
import AuthSection from './auth-section';
import HeaderLogo from './header-logo';

const TopNav: React.FC = () => {
    return (
        <div className="top-nav-container flex justify-between items-center h-[60px] px-[64px] py-1 bg-[#26292B] border-b">
            <HeaderLogo />
            <AuthSection />
        </div>
    )
};

export default TopNav;