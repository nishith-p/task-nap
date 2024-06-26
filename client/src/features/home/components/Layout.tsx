import { Center, Group, Stack, Title } from "@mantine/core";
import { useLocation } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { IconCirclePlus } from "@tabler/icons-react";

import { LayoutProps } from "@/features/shared/schemas/types";
import { ProjectModal } from "@/components/ProjectModal/ProjectModal";

import classes from "@/components/ui/common.module.css";

export const Layout = ({ title, children }: LayoutProps) => {
  const location = useLocation();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Center maw={700} mb={100} mx="auto">
        <Stack w={700} gap={20}>
          <Group justify="space-between">
            <Title order={2} ml="xs" ff="monospace" c="absolute.4">
              {title}
            </Title>
            {location.pathname === "/home" && (
              <div>
                <div className={classes.addIcon} onClick={open}>
                  <Center>
                    <IconCirclePlus size={18} />
                  </Center>
                </div>
                <ProjectModal
                  opened={opened}
                  onClose={close}
                  title="Create Project"
                />
              </div>
            )}
          </Group>
          {children}
        </Stack>
      </Center>
    </>
  );
};
