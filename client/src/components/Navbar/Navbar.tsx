import cx from "clsx";
import { useState } from "react";
import {
  Container,
  Group,
  Burger,
  Avatar,
  Menu,
  UnstyledButton,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconNote, IconLogout, IconSettings } from "@tabler/icons-react";

import classes from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

const links = [
  { link: "/home", label: "Projects" },
  { link: "/home/tasks", label: "Tasks" },
];

export function Navbar() {
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const items = links.map((link) => (
    <NavLink key={link.label} to={link.link} className={classes.link}>
      {link.label}
    </NavLink>
  ));

  return (
    <header className={classes.header}>
      <Container size="sm" className={classes.inner}>
        <IconNote />
        <Group gap={5} visibleFrom="xs">
          {items}
          <Menu
            width={150}
            position="bottom-end"
            transitionProps={{ transition: "pop-top-right" }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, {
                  [classes.userActive]: userMenuOpened,
                })}
              >
                <Group gap={7}>
                  <Avatar
                    src={null}
                    alt="Vitaly Rtishchev"
                    color="absolute.4"
                    size={32}
                    ff="monospace"
                    ml={10}
                  >
                    AG
                  </Avatar>
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={
                  <IconSettings
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                }
              >
                Settings
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconLogout
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                }
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}
