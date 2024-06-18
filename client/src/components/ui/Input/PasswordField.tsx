import { PasswordInput, PasswordInputProps } from "@mantine/core";

export const PasswordField: React.FC<PasswordInputProps> = ({ ...props }) => {
  return (
    <PasswordInput
      {...props}
      size="md"
      //   styles={{
      //     input: { backgroundColor: "#101010", borderColor: "#37394C" },
      //     innerInput: { "::placeholder": { color: "#B9B9C1" } },
      //     icon: {
      //       color: "#B9B9C1",
      //     },
      //     label: {
      //       fontSize: "16px",
      //       color: "white",
      //     },
      //   }}
    ></PasswordInput>
  );
};
