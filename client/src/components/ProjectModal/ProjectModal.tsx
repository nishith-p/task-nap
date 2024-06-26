import { Button, Group, Modal, Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";

import { DropdownField, TextField } from "../ui/Input";
import { ProjectDetails } from "@/features/home/types";
import {
  ProjectCategory,
  ProjectStatus,
} from "@/features/shared/schemas/types";
import { capitalize } from "@/lib/utils";

interface ProjectModalProps {
  opened: boolean;
  onClose: () => void;
  title: string;
}

export const ProjectModal = ({ opened, onClose, title }: ProjectModalProps) => {
  const form = useForm({
    //validate: zodResolver(registerSchema),
    initialValues: {
      projectName: "",
      projectDesc: "",
      projectCategory: ProjectCategory.Business,
      projectStatus: ProjectStatus.Open,
    },
  });

  const categoryDropDown = Object.values(ProjectCategory).map((category) => ({
    value: category,
    label: capitalize(category),
  }));

  const statusDropDown = Object.values(ProjectStatus).map((status) => ({
    value: status,
    label: capitalize(status),
  }));

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const handleSubmit = async (values: ProjectDetails) => {
    //register(values);
    console.log(values);
  };
  return (
    <>
      <Modal
        opened={opened}
        onClose={handleClose}
        title={title}
        closeOnClickOutside={false}
        yOffset="20vh"
      >
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Stack>
            <DropdownField
              label="Type"
              variant="modal"
              data={categoryDropDown}
              {...form.getInputProps("projectCategory")}
            />
            <TextField
              label="Project Name"
              variant="modal"
              {...form.getInputProps("projectName")}
            />
            <TextField
              label="Short Summary"
              variant="modal"
              {...form.getInputProps("projectDesc")}
            />
            <Text mt="-10px" mb="-5px" size="xs" c="dimmed">
              Concisely summarize the project in one or two sentences.
            </Text>
            <DropdownField
              label="Status"
              variant="modal"
              data={statusDropDown}
              {...form.getInputProps("projectStatus")}
            />
            <Group mt="xs" justify="right">
              <Button type="submit" w={140} c="absolute.4" color="dark.7">
                Create Project
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </>
  );
};
