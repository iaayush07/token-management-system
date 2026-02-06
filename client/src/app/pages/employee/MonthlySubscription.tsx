import {
  Box,
  Text,
  Grid,
  Card,
  Group,
  Avatar,
  Stack,
  Divider,
  Radio,
  Button,
  useMantineTheme,
} from "@mantine/core";
import { IconCalendarMonth } from "@tabler/icons-react";
import { useState } from "react";

export default function MonthlySubscription() {
  const theme = useMantineTheme();
  const [choice, setChoice] = useState<"yes" | "no">("yes");

  const purpleLight = theme.colors.grape[3];
  const purpleBase = theme.colors.grape[6];
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
      <Text style={{ fontSize: 36 }}>Monthly Subscription 📅</Text>
      <Text c="dimmed" size="sm">
        Subscribe for lunch access in March 2026
      </Text>

      <Grid gutter="md" mt="md">
        {/* Left: 7 */}
        <Grid.Col span={{ base: 12, sm: 7 }}>
          <Card withBorder radius="md" p="md">
            <Stack gap="sm">
              <Group justify="space-between">
                <Text fw={600} c="gray.7" style={{ fontSize: 18 }}>
                  Subscription Form
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

              <Text>🟢 Enrollment is currently open</Text>
              <Text c="gray.7" fw={600}>
                Do you want to subscribe for lunch in March 2026?
              </Text>

              {/* Radio Card Options */}
              <Stack gap="sm">
                <Card
                  withBorder
                  radius="md"
                  p="md"
                  onClick={() => setChoice("yes")}
                  style={{
                    cursor: "pointer",
                    borderColor: choice === "yes" ? brandBase : undefined,
                    background:
                      choice === "yes"
                        ? `linear-gradient(135deg, ${brandBase}, ${brandLight})`
                        : "transparent",
                    color: choice === "yes" ? theme.white : undefined,
                  }}
                >
                  <Group justify="space-between" align="flex-start">
                    <Stack gap={2}>
                      <Text fw={600} c={choice === "yes" ? "white" : "gray.7"}>
                        Yes, I want
                      </Text>
                      <Text c={choice === "yes" ? "white" : "dimmed"} size="sm">
                        Subscribe for daily lunch access
                      </Text>
                    </Stack>
                    <Radio
                      value="yes"
                      checked={choice === "yes"}
                      onChange={() => setChoice("yes")}
                      styles={{
                        radio: {
                          borderColor:
                            choice === "yes" ? theme.white : brandBase,
                        },
                      }}
                    />
                  </Group>
                </Card>

                <Card
                  withBorder
                  radius="md"
                  p="md"
                  onClick={() => setChoice("no")}
                  style={{
                    cursor: "pointer",
                    borderColor:
                      choice === "no" ? theme.colors.gray[6] : undefined,
                  }}
                >
                  <Group justify="space-between" align="flex-start">
                    <Stack gap={2}>
                      <Text fw={600} c="gray.7">
                        No, I don't want
                      </Text>
                      <Text c="dimmed" size="sm">
                        Opt out for next Month
                      </Text>
                    </Stack>
                    <Radio
                      value="no"
                      checked={choice === "no"}
                      onChange={() => setChoice("no")}
                    />
                  </Group>
                </Card>
              </Stack>

              <Group justify="flex-end">
                <Button variant="light" color="brand" radius="md">
                  Submit Subscription
                </Button>
              </Group>
            </Stack>
          </Card>
        </Grid.Col>

        {/* Right: 5 */}
        <Grid.Col span={{ base: 12, sm: 5 }}>
          <Card withBorder radius="md" p="md">
            <Stack gap="md">
              {/* Current Status */}
              <Stack gap="xs">
                <Text fw={600} c="gray.7" style={{ fontSize: 18 }}>
                  Current Status
                </Text>
                <Grid gutter="xs">
                  <Grid.Col span={12}>
                    <Card withBorder radius="md" p="md">
                      <Stack gap={4}>
                        <Text fw={600} c="gray.7">
                          This Month (February 2026)
                        </Text>
                        <Text>✅ Subscribed</Text>
                      </Stack>
                    </Card>
                  </Grid.Col>
                  <Grid.Col span={12}>
                    <Card withBorder radius="md" p="md">
                      <Stack gap={4}>
                        <Text fw={600} c="gray.7">
                          Enrollment Status
                        </Text>
                        <Text>🟢 Open</Text>
                      </Stack>
                    </Card>
                  </Grid.Col>
                </Grid>
              </Stack>

              <Divider />

              {/* Important Notes */}
              <Stack gap="xs">
                <Text fw={600} c="gray.7" style={{ fontSize: 18 }}>
                  Important Notes
                </Text>
                <Stack gap={6}>
                  <Text>
                    • Subscriptions must be submitted before the cutoff date
                  </Text>
                  <Text>• Once the cutoff passes, changes cannot be made</Text>
                  <Text>
                    • You can update your choice anytime before cutoff
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
