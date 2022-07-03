import React from "react";
import AuthSection from "../../molecules/AuthSection/auth-section";
import HeaderLogo from "../../molecules/HeaderLogo/header-logo";

const TopNav: React.FC = () => {
    return (
        <div className="top-nav-container flex justify-between items-center h-[60px] px-[64px] py-1 bg-[#26292B] border-b">
            <HeaderLogo />
            <AuthSection />
        </div>
    );
};

export default TopNav;