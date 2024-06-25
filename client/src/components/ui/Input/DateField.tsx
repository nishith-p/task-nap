import { DateInput, DateInputProps } from "@mantine/dates";

export const DateField: React.FC<DateInputProps> = ({ ...props }) => {
  return (
    <DateInput
      {...props}
      size="md"
      //   styles={{
      //     input: {
      //       backgroundColor: "#101010",
      //       borderColor: "#37394C",
      //       "::placeholder": { color: "#B9B9C1" },
      //     },
      //     icon: {
      //       color: "#B9B9C1",
      //     },
      //     label: {
      //       fontSize: "16px",
      //       color: "white",
      //     },
      //   }}
    ></DateInput>
  );
};
