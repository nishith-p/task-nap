import { TextInput, TextInputProps } from "@mantine/core";
import React from "react";

export const TextField: React.FC<TextInputProps> = ({ ...props }) => {
  return (
    <TextInput
      {...props}
      size="md"
      styles={{
        // input: {
        //   borderColor: "#37394C",
        //   backgroundColor: "#101010",
        //   "::placeholder": { color: "#B9B9C1" },
        // },
        label: {
          fontSize: "16px",
          color: "white",
        },
      }}
    ></TextInput>
  );
};
