import {
  Box,
  Text,
  Card,
  Group,
  Avatar,
  Badge,
  Button,
  Stack,
  Grid,
  useMantineTheme,
} from "@mantine/core";
import { IconCalendarMonth, IconClock } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const userData = sessionStorage.getItem("tm_user");
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const purpleLight = theme.colors.grape[3];
  const purpleBase = theme.colors.grape[6];
  const blueLight = theme.colors.blue[3];
  const blueBase = theme.colors.blue[6];
  const brandLight = theme.colors.brand[3];
  const brandBase = theme.colors.brand[6];

  return (
    <Box
      style={{
        overflowY: "auto",
        overflowX: "hidden",
        height: "100%",
        padding: 12,
      }}
    >
      <Text style={{ fontSize: 36 }}>
        Welcome, {userData ? JSON.parse(userData).fullName : "User"}! 👋
      </Text>
      <Text c="dimmed" size="sm">
        Manage your lunch subscription and daily tokens
      </Text>

      <Grid gutter="md" mt="md" w="50%">
        <Grid.Col span={{ base: 12, sm: 6 }}>
          {/* Monthly Subscription Card */}
          <Card withBorder radius="md" p="md">
            <Stack gap="xs">
              <Group justify="space-between">
                <Text fw={600} c="gray.7" style={{ fontSize: 18 }}>
                  Monthly Subscription
                </Text>
                <Avatar
                  radius={12}
                  size={40}
                  styles={{
                    root: {
                      background: `linear-gradient(135deg, ${purpleBase}, ${purpleLight})`,
                      color: theme.white,
                    },
                  }}
                >
                  <IconCalendarMonth size={22} style={{ color: "white" }} />
                </Avatar>
              </Group>

              <Text c="dimmed" size="sm">
                February 2026
              </Text>

              <Badge
                variant="gradient"
                gradient={{ from: brandBase, to: brandLight, deg: 135 }}
                radius="sm"
              >
                Subscribed
              </Badge>

              <Button
                variant="light"
                color="brand"
                radius="md"
                onClick={() => navigate("/monthly-subscription")}
              >
                Manage Subscription
              </Button>
            </Stack>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6 }}>
          {/* Today's Lunch Card */}
          <Card withBorder radius="md" p="md">
            <Stack gap="xs">
              <Group justify="space-between">
                <Text fw={600} c="gray.7" style={{ fontSize: 18 }}>
                  Today’s Lunch
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
                  <IconClock size={22} style={{ color: "white" }} />
                </Avatar>
              </Group>

              <Text c="dimmed" size="sm">
                Thursday, February 5
              </Text>

              <Badge color="blue" radius="sm">
                Active
              </Badge>

              <Button
                variant="light"
                color="blue"
                radius="md"
                onClick={() => navigate("/todays-token")}
              >
                Show Today’s QR
              </Button>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
