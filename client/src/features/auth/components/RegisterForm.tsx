import { useForm } from "@mantine/form";
import { Container, Stack, Button, Group } from "@mantine/core";
import { IconAt, IconLock, IconUser } from "@tabler/icons-react";

import { TextField, PasswordField } from "@/components/ui/Input";
import { LinkText } from "@/components/ui/LinkText";
import { HeaderText } from "@/components/ui/HeaderText";
import { RegisterCredentials } from "../types";

export const RegisterForm = () => {
  const form = useForm({
    //validate: zodResolver(registerSchema),
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      dob: "",
    },
  });

  const handleSubmit = async (values: RegisterCredentials) => {
    //register(values);
    console.log(values);
  };

  return (
    <div>
      <Container w="50vh">
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Stack>
            <HeaderText title="Sign up" />
            <TextField
              label="Full Name"
              placeholder="Enter your name"
              leftSection={<IconUser size="1rem" />}
              {...form.getInputProps("firstName")}
            />
            <TextField
              label="Email"
              placeholder="Enter your email"
              leftSection={<IconAt size="1rem" />}
              {...form.getInputProps("email")}
            />
            <PasswordField
              label="Password"
              placeholder="Choose your password"
              leftSection={<IconLock size="1.2rem" />}
              {...form.getInputProps("password")}
            />
            <Group justify="space-between">
              <LinkText to="/auth/sign-in" fw={500} fz={16} c="absolute.2">
                Back
              </LinkText>
              <Button type="submit" w={80} c="absolute.4" color="dark.7">
                Next
              </Button>
            </Group>
          </Stack>
        </form>
      </Container>
    </div>
  );
};
