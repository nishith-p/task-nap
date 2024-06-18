import { Link } from "react-router-dom";
import { Text, TextProps } from "@mantine/core";

export const LinkText: React.FC<
  TextProps & { to: string; children: React.ReactNode }
> = ({ to, children, ...props }) => {
  return (
    <Link to={to} style={{ textDecoration: "none" }}>
      <Text {...props}>{children}</Text>
    </Link>
  );
};
