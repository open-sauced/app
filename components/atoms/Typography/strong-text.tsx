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

/* import React from "react";
import { Typography } from "@supabase/ui";

interface TextProps {
    className?: string;
    customTailWindProps?: string;
    children: React.ReactNode;
}

const StrongText: React.FC<any> = ({ children, ...props }) => {
  const { Text } = Typography;

  return (
    <Text {...props}>
      {children}
    </Text>
  );
};

export default StrongText; 

Just yoink this interface directly from the supabase ui node modules?

export interface Props {
    className?: string;
    children: any;
    style?: React.CSSProperties;
    type?: 'default' | 'secondary' | 'success' | 'warning' | 'danger';
    disabled?: boolean;
    mark?: boolean;
    code?: boolean;
    keyboard?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    strong?: boolean;
    small?: boolean;
} */