import { Text, Container, Group, Anchor } from "@mantine/core";

import classes from "./Footer.module.css";

const links = [{ link: "#", label: "Source" }];

export function Footer() {
  const items = links.map((link) => (
    <Anchor<"a">
      c="dimmed"
      key={link.label}
      href={link.link}
      onClick={(event) => event.preventDefault()}
      size="xs"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <Container size="sm" className={classes.inner} ff="mono">
        <Text fz="xs" c="dimmed">
          Nishith Pinnawala (
          <Anchor<"a">
            c="absolute.4"
            href="https://github.com/nishith-p"
            onClick={(event) => event.preventDefault()}
            size="xs"
          >
            @nishith-p
          </Anchor>
          )
        </Text>
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
}
