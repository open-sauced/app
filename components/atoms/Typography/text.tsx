import React from "react";
import { Typography } from "@supabase/ui";

const { Text: SupabaseTextComponent } = Typography;

interface TextProps extends React.ComponentProps<typeof SupabaseTextComponent> {
  //Add additional prop definitions here
  title?: string;
}

const Text: React.FC<TextProps> = (props) => {
  return (
    <SupabaseTextComponent className={`${props.className && props.className}`} {...props}>
      <span title={props.title}>{props.children}</span>
    </SupabaseTextComponent>
  );
};

export default Text;
