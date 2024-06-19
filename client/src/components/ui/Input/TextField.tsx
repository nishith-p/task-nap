import { TextInput, TextInputProps } from "@mantine/core";
import React from "react";

export const TextField: React.FC<TextInputProps> = ({ ...props }) => {
  return (
    <TextInput
      {...props}
      size="md"
      styles={{
        input: {
          border: "none",
          backgroundColor: "#313131",
          "::placeholder": { color: "#B9B9C1" },
        },
        label: {
          fontSize: "14px",
          color: "#F3F4F6",
        },
      }}
    ></TextInput>
  );
};
