import { useForm } from "@mantine/form";
import { Button, Container, Group, Stack } from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";

import { TextField, PasswordField } from "@/components/ui/Input";
import { LinkText } from "@/components/ui/LinkText";
import { HeaderText } from "@/components/ui/HeaderText";
import { LoginCredentials } from "../types";

export const LoginForm = () => {
  const form = useForm<LoginCredentials>({
    //validate: zodResolver(loginSchema),
    initialValues: {
      email: "",
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
            <HeaderText title="Sign in" />
            <TextField
              placeholder="Email"
              leftSection={<IconAt size="1rem" />}
              {...form.getInputProps("email")}
            />
            <PasswordField
              placeholder="Password"
              leftSection={<IconLock size="1.2rem" />}
              {...form.getInputProps("password")}
            />
            <Group justify="space-between">
              <LinkText to="/auth/sign-up" fw={500} fz={16} c="absolute.2">
                Create an account
              </LinkText>
              <Group>
                <LinkText to="/" fw={500} fz={14} c="absolute.2">
                  Reset
                </LinkText>
                <Button type="submit" w={80} c="absolute.4" color="dark.7">
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
