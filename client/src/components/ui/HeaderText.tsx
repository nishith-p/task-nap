import { Text, Header, Container, Group, Center, rem } from "@mantine/core";

const HEADER_HEIGHT = rem(60);

export const HeaderText = ({ title }: { title: string }) => {
  return (
    <Header height={HEADER_HEIGHT} bg="#101010">
      <Container h={60}>
        <Group position="apart">
          <Center h={60} inline>
            <Text fz={20} fw={600} color="white">
              {title}
            </Text>
          </Center>
        </Group>
      </Container>
    </Header>
  );
};
