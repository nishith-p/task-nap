import { PasswordInput, PasswordInputProps } from "@mantine/core";

type CustomPasswordInputProps = {
  variant?: string;
} & PasswordInputProps;

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

export const PasswordField = ({
  variant,
  ...props
}: CustomPasswordInputProps) => {
  return (
    <PasswordInput
      {...props}
      size={variant === "modal" ? "sm" : "md"}
      styles={getStyles(variant)}
    ></PasswordInput>
  );
};
