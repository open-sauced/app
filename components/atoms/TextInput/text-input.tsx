import React from "react";
import { Input as SupbaseInputComponent } from "@supabase/ui";

interface TextInputProps extends React.ComponentProps<typeof SupbaseInputComponent> {
  //Add additional prop definitions here
}

const TextInput: React.FC<TextInputProps> = ( props ) => {
  return (
    <SupbaseInputComponent {...props}>
      {props.children}
    </SupbaseInputComponent>
  );
};

export default TextInput;