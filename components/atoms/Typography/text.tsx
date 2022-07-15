import React from "react";
import { Typography } from "@supabase/ui";

const { Text: SupabaseTextComponent } = Typography;

interface TextProps extends React.ComponentProps<typeof SupabaseTextComponent> {
  //Add additional prop definitions here
}

const Text: React.FC<TextProps> = ( props ) => {

  return (
    <SupabaseTextComponent className={`${props.className && props.className}`} {...props}>
      {props.children}
    </SupabaseTextComponent>
  );
};

export default Text;