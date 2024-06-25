import { format } from "date-fns";
import { Table, Text } from "@mantine/core";
import {
  IconArrowDown,
  IconArrowRight,
  IconArrowUp,
  IconUrgent,
} from "@tabler/icons-react";

type UserTaskElement = {
  status: string;
  title: string;
  proj: string;
  assignee: string;
  priority: string;
  ddl: string;
};

type UserTasksListProps = {
  elements: UserTaskElement[];
};

const priorityIcons: { [key: string]: JSX.Element } = {
  URGENT: <IconUrgent size={16} />,
  HIGH: <IconArrowUp size={16} />,
  MEDIUM: <IconArrowRight size={16} />,
  LOW: <IconArrowDown size={16} />,
};

export const TasksList = ({ elements }: UserTasksListProps) => {
  const rows = elements.map((element) => (
    <Table.Tr key={element.title}>
      <Table.Td>
        <Text fz={14} lineClamp={1}>
          {element.title}
        </Text>
      </Table.Td>
      <Table.Td fz={14} c="absolute.2">
        <Text fz={14} lineClamp={1}>
          {element.proj}
        </Text>
      </Table.Td>
      <Table.Td fz={14} c="absolute.2" ta="center">
        {priorityIcons[element.priority]}
      </Table.Td>
      <Table.Td fz={13} c="absolute.2" ta="right">
        {format(element.ddl, "MMM d")}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table
      verticalSpacing={11}
      highlightOnHover
      highlightOnHoverColor="#242424"
      borderColor="absolute.3"
    >
      <Table.Thead>
        <Table.Tr fz={14}>
          <Table.Th w={350} fw={400} c="absolute.5" ff="monospace">
            title
          </Table.Th>
          <Table.Th w={200} fw={400} c="absolute.5" ff="monospace">
            proj
          </Table.Th>
          <Table.Th w={50} fw={400} c="absolute.5" ff="monospace" ta="center">
            priority
          </Table.Th>
          <Table.Th fw={200} c="absolute.5" ff="monospace" ta="right">
            ddl
          </Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody c="absolute.4">{rows}</Table.Tbody>
    </Table>
  );
};
