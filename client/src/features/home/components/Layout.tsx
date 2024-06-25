import { Center, Stack, Title } from "@mantine/core";

import { LayoutProps } from "@/features/shared/schemas/types";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";

export const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <Center maw={700} mb={100} mx="auto">
        <Stack w={700} gap={20}>
          <Title order={2} ml="xs" ff="monospace" c="absolute.4">
            {title}
          </Title>
          {children}
        </Stack>
      </Center>
      <Footer />
    </>
  );
};
