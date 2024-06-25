import { Table } from "@mantine/core";

type ProjectElement = {
  title: string;
  owner: string;
};

type ProjectListProps = {
  elements: ProjectElement[];
};

export const ProjectsList = ({ elements }: ProjectListProps) => {
  const rows = elements.map((element) => (
    <Table.Tr key={element.title}>
      <Table.Td fz={14}>{element.title}</Table.Td>
      <Table.Td fz={14} c="absolute.2" ta="right">
        {element.owner}
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
          <Table.Th fw={400} c="absolute.5" ff="monospace">
            title
          </Table.Th>
          <Table.Th fw={400} c="absolute.5" ff="monospace" ta="right">
            owner
          </Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody c="absolute.4">{rows}</Table.Tbody>
    </Table>
  );
};
