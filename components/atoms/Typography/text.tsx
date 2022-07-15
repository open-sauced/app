import React from "react";
import { Typography } from "@supabase/ui";

const { Text } = Typography;

interface TextProps extends React.ComponentProps<typeof Text> {
  test?: string;
}

const Test: React.FC<TextProps> = (props) => {

  return (
    <Text {...props}>
      {props.children}
    </Text>
  );
};

export default Test;