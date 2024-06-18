import { useForm } from "@mantine/form";
import { Button, Container, Group, Stack, Text } from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";

import { TextField, PasswordField } from "@/components/ui/Input";
import { LinkText } from "@/components/ui/LinkText";
import { LoginCredentials } from "../types";

export const LoginForm = () => {
  const form = useForm<LoginCredentials>({
    //validate: zodResolver(loginSchema),
    initialValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmit = async (values: LoginCredentials) => {
    console.log(values);
  };

  return (
    <div>
      <Container w="50vh">
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Stack>
            <Text fw={500}>Sign in</Text>
            <TextField
              placeholder="Username"
              leftSection={<IconAt size="1rem" />}
              {...form.getInputProps("username")}
            />
            <PasswordField
              placeholder="Password"
              leftSection={<IconLock size="1.2rem" />}
              {...form.getInputProps("password")}
            />
            <Group justify="space-between">
              <LinkText to="/sign-up" fw={500} fz={16}>
                Create an account
              </LinkText>
              <Group>
                <LinkText to="/" fw={500} fz={14}>
                  Reset
                </LinkText>
                <Button type="submit" w={80}>
                  Next
                </Button>
              </Group>
            </Group>
          </Stack>
        </form>
      </Container>
    </div>
  );
};
