import { NativeSelect, NativeSelectProps } from "@mantine/core";

type CustomNativeSelectProps = {
  variant?: string;
} & NativeSelectProps;

const getStyles = (variant: string | undefined) => ({
  input: {
    fontSize: variant === "modal" ? "13px" : "14px",
    backgroundColor: "#313131",
    border: "none",
  },
  label: {
    fontSize: variant === "modal" ? "12px" : "14px",
    color: "white",
    ...(variant === "modal" && { marginBottom: "5px" }),
  },
});

export const DropdownField = ({
  variant,
  ...props
}: CustomNativeSelectProps) => {
  return (
    <NativeSelect
      {...props}
      size={variant === "modal" ? "sm" : "md"}
      styles={getStyles(variant)}
    ></NativeSelect>
  );
};
