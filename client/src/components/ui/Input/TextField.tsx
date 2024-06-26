import { TextInput, TextInputProps } from "@mantine/core";

type CustomTextInputProps = {
  variant?: string;
} & TextInputProps;

const getStyles = (variant: string | undefined) => ({
  input: {
    fontSize: variant === "modal" ? "13px" : "14px",
    backgroundColor: "#313131",
    border: "none",
    "::placeholder": { color: "#B9B9C1" },
  },
  label: {
    fontSize: variant === "modal" ? "12px" : "14px",
    color: "#F3F4F6",
    ...(variant === "modal" && { marginBottom: "5px" }),
  },
});

export const TextField = ({ variant, ...props }: CustomTextInputProps) => {
  return (
    <TextInput
      {...props}
      size={variant === "modal" ? "sm" : "md"}
      styles={getStyles(variant)}
    ></TextInput>
  );
};
