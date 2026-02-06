import {
  Avatar,
  Box,
  Card,
  Grid,
  Group,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import {
  IconCalendarMonth,
  IconCalendarStats,
  IconToolsKitchen2,
  IconUsers,
} from "@tabler/icons-react";

export default function AdminDashboard() {
  const theme = useMantineTheme();

  const blueLight = theme.colors.blue[3];
  const blueBase = theme.colors.blue[6];
  const greenLight = theme.colors.green[3];
  const greenBase = theme.colors.green[6];
  const orangeLight = theme.colors.orange[3];
  const orangeBase = theme.colors.orange[6];
  const grapeBase = theme.colors.grape[6];
  const pinkLight = theme.colors.pink?.[3] ?? theme.colors.grape[2];

  return (
    <Box
      style={{
        overflowY: "auto",
        overflowX: "hidden",
        height: "100%",
        padding: 12,
      }}
    >
      <Text style={{ fontSize: 36 }}>Welcome, John Doe! 👋</Text>
      <Text c="dimmed" size="sm">
        Overview and monitoring - February 2026
      </Text>

      <Grid gutter="md" mt="md">
        {/* Total Subscribed */}
        <Grid.Col span={{ base: 12, sm: 3 }}>
          <Card
            withBorder
            radius="md"
            p="md"
            styles={{
              root: {
                background: theme.colors.blue[0],
                borderColor: theme.colors.blue[2],
              },
            }}
          >
            <Stack gap="xs">
              <Group justify="space-between">
                <Text fw={600} c="gray.7" style={{ fontSize: 18 }}>
                  Total Subscribed
                </Text>
                <Avatar
                  radius={12}
                  size={40}
                  styles={{
                    root: {
                      background: `linear-gradient(135deg, ${blueBase}, ${blueLight})`,
                      color: theme.white,
                    },
                  }}
                >
                  <IconUsers size={22} style={{ color: "white" }} />
                </Avatar>
              </Group>
              <Text style={{ fontSize: 28, fontWeight: 700 }} c="gray.8">
                5
              </Text>
              <Text c="dimmed">employees for this month</Text>
            </Stack>
          </Card>
        </Grid.Col>

        {/* Today's Lunch */}
        <Grid.Col span={{ base: 12, sm: 3 }}>
          <Card
            withBorder
            radius="md"
            p="md"
            styles={{
              root: {
                background: theme.colors.green[0],
                borderColor: theme.colors.green[2],
              },
            }}
          >
            <Stack gap="xs">
              <Group justify="space-between">
                <Text fw={600} c="gray.7" style={{ fontSize: 18 }}>
                  Today's Lunch
                </Text>
                <Avatar
                  radius={12}
                  size={40}
                  styles={{
                    root: {
                      background: `linear-gradient(135deg, ${greenBase}, ${greenLight})`,
                      color: theme.white,
                    },
                  }}
                >
                  <IconToolsKitchen2 size={22} style={{ color: "white" }} />
                </Avatar>
              </Group>
              <Text style={{ fontSize: 28, fontWeight: 700 }} c="gray.8">
                5
              </Text>
              <Text c="dimmed">lunches served today</Text>
            </Stack>
          </Card>
        </Grid.Col>

        {/* Remaining Expected */}
        <Grid.Col span={{ base: 12, sm: 3 }}>
          <Card
            withBorder
            radius="md"
            p="md"
            styles={{
              root: {
                background: theme.colors.orange[0],
                borderColor: theme.colors.orange[2],
              },
            }}
          >
            <Stack gap="xs">
              <Group justify="space-between">
                <Text fw={600} c="gray.7" style={{ fontSize: 18 }}>
                  Remaining Expected
                </Text>
                <Avatar
                  radius={12}
                  size={40}
                  styles={{
                    root: {
                      background: `linear-gradient(135deg, ${orangeBase}, ${orangeLight})`,
                      color: theme.white,
                    },
                  }}
                >
                  <IconCalendarStats size={22} style={{ color: "white" }} />
                </Avatar>
              </Group>
              <Text style={{ fontSize: 28, fontWeight: 700 }} c="gray.8">
                5
              </Text>
              <Text c="dimmed">expected for today</Text>
            </Stack>
          </Card>
        </Grid.Col>

        {/* Enrollment Status */}
        <Grid.Col span={{ base: 12, sm: 3 }}>
          <Card
            withBorder
            radius="md"
            p="md"
            h="100%"
            styles={{
              root: {
                background: theme.colors.grape[0],
                borderColor: theme.colors.grape[2],
              },
            }}
          >
            <Stack gap="xs">
              <Group justify="space-between">
                <Text fw={600} c="gray.7" style={{ fontSize: 18 }}>
                  Enrollment Status
                </Text>
                <Avatar
                  radius={12}
                  size={40}
                  styles={{
                    root: {
                      background: `linear-gradient(135deg, ${grapeBase}, ${pinkLight})`,
                      color: theme.white,
                    },
                  }}
                >
                  <IconCalendarMonth size={22} style={{ color: "white" }} />
                </Avatar>
              </Group>
              <Text style={{ fontSize: 22, fontWeight: 700 }} c="gray.8">
                open
              </Text>
              <Text c="dimmed">for next month</Text>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
