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
import { useMemo, useState } from "react";
import { useMeSafe } from "../../../shared/utility/hooks/useMeSafe";
import { useGetEnrollmentStatusQuery } from "./utility/services/enrollmentService";
import { useSaveSubscriptionMutation } from "./utility/services/subscription.service";

export default function MonthlySubscription() {
  const theme = useMantineTheme();
  const [choice, setChoice] = useState<"yes" | "no">("yes");

  const purpleLight = theme.colors.grape[3];
  const purpleBase = theme.colors.grape[6];
  const brandLight = theme.colors.brand[3];
  const brandBase = theme.colors.brand[6];

  // For now: use current calendar month for enrollment status and submission
  const now = useMemo(() => new Date(), []);
  const currentYear = now.getFullYear();
  const currentMonthNum = now.getMonth() + 1; // 1-12
  const currentMonthLabel = now.toLocaleString("default", { month: "long" });
  const currentMonthIso = `${currentYear}-${String(currentMonthNum).padStart(2, "0")}-01`;

  const { user } = useMeSafe();
  const { data: enrollmentStatus, isFetching: enrollmentLoading } =
    useGetEnrollmentStatusQuery({ year: currentYear, month: currentMonthNum });
  const [saveSubscription, { isLoading: saving }] =
    useSaveSubscriptionMutation();

  const enrollmentOpen = enrollmentStatus?.is_open ?? false;

  const handleSubmit = async () => {
    if (!user?.id) {
      console.warn("No user ID found; cannot submit subscription");
      return;
    }
    if (!enrollmentOpen) {
      console.warn("Enrollment is closed; submission blocked");
      return;
    }
    try {
      const status: "ACTIVE" | "INACTIVE" =
        choice === "yes" ? "ACTIVE" : "INACTIVE";
      const payload = {
        userId: user.id,
        planName: "LUNCH",
        status,
        startDate: currentMonthIso,
        endDate: null,
      };
      const res = await saveSubscription(payload).unwrap();
      console.log("Subscription saved", res);
    } catch (err) {
      console.error("Failed to save subscription", err);
    }
  };

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
        Subscribe for lunch access in {currentMonthLabel} {currentYear}
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

              <Text>
                {enrollmentLoading
                  ? "Checking enrollment status…"
                  : enrollmentOpen
                    ? "🟢 Enrollment is currently open"
                    : "🔴 Enrollment is closed for the target month"}
              </Text>
              <Text c="gray.7" fw={600}>
                Do you want to subscribe for lunch in {currentMonthLabel}{" "}
                {currentYear}?
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
                <Button
                  variant="light"
                  color="brand"
                  radius="md"
                  disabled={
                    !enrollmentOpen || saving || enrollmentLoading || !user?.id
                  }
                  onClick={handleSubmit}
                  //   {
                  //   console.log(user?.id, "sub");

                  //   if (!user?.id) return;
                  //   try {
                  //     saveSubscription({
                  //       userId: user.id,
                  //       planName: "LUNCH",
                  //       status: choice === "yes" ? "ACTIVE" : "INACTIVE",
                  //       startDate: currentMonthIso,
                  //       endDate: null,
                  //     }).unwrap();
                  //   } catch {
                  //     // silently fail; could add notifications if desired
                  //   }
                  // }
                  // }
                >
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
                          Current Month ({currentMonthLabel} {currentYear})
                        </Text>
                        <Text>
                          {choice === "yes"
                            ? "✅ Will Subscribe"
                            : "❌ Will Not Subscribe"}
                        </Text>
                      </Stack>
                    </Card>
                  </Grid.Col>
                  <Grid.Col span={12}>
                    <Card withBorder radius="md" p="md">
                      <Stack gap={4}>
                        <Text fw={600} c="gray.7">
                          Enrollment Status
                        </Text>
                        <Text>{enrollmentOpen ? "🟢 Open" : "🔴 Closed"}</Text>
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
