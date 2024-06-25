import { PasswordInput, PasswordInputProps } from "@mantine/core";

export const PasswordField: React.FC<PasswordInputProps> = ({ ...props }) => {
  return (
    <PasswordInput
      {...props}
      size="md"
      styles={{
        input: {
          backgroundColor: "#313131",
          border: "none",
        },
        innerInput: { "::placeholder": { color: "#B9B9C1" } },
        label: {
          fontSize: "14px",
          color: "white",
        },
      }}
    ></PasswordInput>
  );
};
