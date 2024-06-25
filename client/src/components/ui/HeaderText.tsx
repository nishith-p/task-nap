import { Text, Container, Group, Center } from "@mantine/core";

export const HeaderText = ({ title }: { title: string }) => {
  return (
    <Container h={60}>
      <Group justify="apart">
        <Center h={60} inline>
          <Text fz={20} fw={600} c="#F3F4F6">
            {title}
          </Text>
        </Center>
      </Group>
    </Container>
  );
};
