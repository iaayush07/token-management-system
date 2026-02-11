import {
  Box,
  Card,
  Divider,
  Grid,
  Group,
  SimpleGrid,
  Stack,
  Switch,
  Table,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { IconCalendar } from "@tabler/icons-react";
import { useMemo } from "react";
import {
  useGetEnrollmentStatusQuery,
  useToggleEnrollmentMutation,
} from "../employee/utility/services/enrollmentService";
import { useGetSubsribersQuery } from "./utility/services/subscribers.service";

const AdminMonthConfiguration = () => {
  // Query remains; hook can later feed real counts if available
  const { data: subscribers } = useGetSubsribersQuery({ month: "2026-02" });

  const now = useMemo(() => new Date(), []);
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // 1-12

  const {
    data: enrollmentStatus,
    isFetching,
    refetch,
  } = useGetEnrollmentStatusQuery({ year, month });
  const [toggleEnrollment, { isLoading: isToggling }] =
    useToggleEnrollmentMutation();

  const currentMonthLabel = useMemo(() => {
    const now = new Date();
    const month = now.toLocaleString("default", { month: "long" });
    const year = now.getFullYear();
    return `${month} ${year}`;
  }, []);

  return (
    <Box
      style={{
        overflowY: "auto",
        overflowX: "hidden",
        height: "100%",
        padding: 12,
      }}
    >
      <Text style={{ fontSize: 36 }}>Month Configuration</Text>
      <Text c="dimmed" size="sm">
        Manage monthly enrollment and subscriptions
      </Text>

      <Grid mt="md" gutter="md">
        {/* Grid 4 */}
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card withBorder radius="md" padding="md">
            <Stack gap={5}>
              <Text size="lg" fw={500}>
                Enrollment Control
              </Text>
              <Stack gap={5}>
                <Text c="dimmed" size="sm">
                  Current Month
                </Text>
                <Group>
                  <ThemeIcon size="lg" variant="light" radius="md">
                    <IconCalendar />
                  </ThemeIcon>
                  <Text fw={600}>{currentMonthLabel}</Text>
                </Group>
              </Stack>

              <Divider my="sm" />

              <Group justify="space-between">
                <Text fw={600}>Enrollment Status</Text>
                <Switch
                  checked={enrollmentStatus?.is_open ?? false}
                  onChange={async (e) => {
                    try {
                      await toggleEnrollment({
                        year,
                        month,
                        isOpen: e.currentTarget.checked,
                      }).unwrap();
                      refetch();
                    } catch {}
                  }}
                  onLabel="Open"
                  offLabel="Closed"
                  size="md"
                  disabled={isFetching || isToggling}
                />
              </Group>

              <Divider my="sm" />

              <SimpleGrid cols={2} spacing="xs">
                <Group gap="xs">
                  <Text>Subscribed</Text>
                  <Text fw={700}>5</Text>
                </Group>
                <Group gap="xs">
                  <Text>Not Subscribed</Text>
                  <Text fw={700}>3</Text>
                </Group>
              </SimpleGrid>

              <Divider my="sm" />

              <Group justify="space-between">
                <Text>Total Employees</Text>
                <Text fw={700}>8</Text>
              </Group>
            </Stack>
          </Card>
        </Grid.Col>

        {/* Grid 8 */}
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Card withBorder radius="md" padding="md">
            <Text size="lg" fw={500}>
              Employee Subscription List
            </Text>
            <Text c="dimmed" size="sm">
              View and monitor employee subscription status
            </Text>
            <Table mt="md" withTableBorder withColumnBorders highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>Email</Table.Th>
                  <Table.Th>Status</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {/* Placeholder row; wire to API data when available */}
                {subscribers?.map((subscriber: any) => (
                  <Table.Tr key={subscriber.id}>
                    <Table.Td>{subscriber.fullName}</Table.Td>
                    <Table.Td>{subscriber.email}</Table.Td>
                    <Table.Td>{subscriber.status}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Card>
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default AdminMonthConfiguration;
