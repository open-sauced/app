import React from "react";
import { Typography } from "@supabase/ui";

const { Title: SupabaseTitleComponent } = Typography;

interface TitleProps extends React.ComponentProps<typeof SupabaseTitleComponent> {
  //Add additional prop definitions here
}

const Title: React.FC<TitleProps> = ( props ) => {

  return (
    <SupabaseTitleComponent {...props}>
      {props.children}
    </SupabaseTitleComponent>
  );
};

export default Title;