import React from "react";
import { Typography } from "@supabase/ui";

interface TextProps {
    className?: string;
    customTailWindProps?: string;
    children: React.ReactNode;
}

const StrongText: React.FC<TextProps> = ({ className, customTailWindProps, children }) => {
    const { Text } = Typography;

    return (
        <Text className={`${className && className} ${customTailWindProps && customTailWindProps}`} strong>
            {children}
        </Text>
    );
};

export default StrongText;