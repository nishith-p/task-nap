import { Center } from "@mantine/core";

import { LayoutProps } from "@/features/shared/schemas/types";

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Center maw={400} h="100vh" mx="auto">
        {children}
      </Center>
    </>
  );
};
