import React from "react";
import { Typography } from "@supabase/ui";

interface TextProps {
    className?: string;
    level?: 1 | 2 | 3 | 4 | 5;
    customTailWindProps?: string;
    children: React.ReactNode;
}

const Title: React.FC<TextProps> = ({ className, customTailWindProps, level, children }) => {
    const { Title } = Typography;

    return (
        <Title level={level} className={`${className && className} ${customTailWindProps && customTailWindProps}`}>
            {children}
        </Title>
    );
};

export default Title;