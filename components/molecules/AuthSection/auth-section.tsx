import React from "react";
import Image from "next/image";
import notifications from "../../../public/notifications.svg";
import downArrow from "../../../public/chevron-down.svg";

const AuthSection: React.FC = () => {
    return (
        <div className="flex">
            <div className="flex items-center">
                <Image alt="Notification Icon" src={notifications} />
                <div className="ml-3 mr-1">
                    <Image alt="User Avatar" src="/ellipse-1.png" height={32} width={32} />
                </div>
                <div>
                    <Image alt="Down Arrow" src={downArrow}/>
                </div>
            </div>
        </div>
    );
};

export default AuthSection;