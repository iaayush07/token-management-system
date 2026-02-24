import {
  Badge,
  Box,
  Card,
  Center,
  Divider,
  Grid,
  List,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import {
  useGenerateQRMutation,
  useGetQRStatusQuery,
  useGetTodayTokenQuery,
} from "./utility/services/employee.service";

export default function TodaysToken() {
  const theme = useMantineTheme();
  const [token, setToken] = useState<string | null>(null);
  const raw = sessionStorage.getItem("tm_user");
  const user = raw ? JSON.parse(raw) : null;
  const [triggerGenerateQR, { isLoading: generating }] =
    useGenerateQRMutation();
  const { data: todayData, isFetching: fetchingToday } = useGetTodayTokenQuery(
    user?.id ? { userId: String(user.id) } : { userId: "" },
    { skip: !user?.id },
  );
  const { data: statusData } = useGetQRStatusQuery(
    token ? { token } : { token: "" },
    {
      skip: !token,
    },
  );

  console.log(token);

  useEffect(() => {
    if (!user?.id || generating || fetchingToday) return;
    // If we already have a token set, don't re-run
    if (token) return;

    const maybeInit = async () => {
      // First, prefer today's token if exists
      if (todayData) {
        if (todayData.status === "unsubscribed") {
          return;
        }
        if (todayData.token) {
          setToken(todayData.token);
          return;
        }
        if (todayData.status === "none") {
          try {
            const res = await triggerGenerateQR({
              userId: String(user.id),
            }).unwrap();
            const tok = (res as any)?.token as string;
            setToken(tok);
          } catch (e) {
            // swallow errors for now; UI shows placeholder
          }
          return;
        }
      }
    };
    maybeInit();
  }, [user?.id, token, todayData, generating, fetchingToday]);

  return (
    <Box
      style={{
        overflowY: "auto",
        overflowX: "hidden",
        height: "100%",
        padding: 12,
      }}
    >
      <Text style={{ fontSize: 36 }}>Today's Token 🎫</Text>
      <Text c="dimmed" size="sm">
        Thursday, February 5, 2026
      </Text>

      <Grid gutter="xs" mt="md">
        <Grid.Col span={{ base: 12, sm: 7 }}>
          <Card withBorder radius="md" w="100%">
            <Stack gap="md" align="center">
              <Text fw={600} c="gray.7" style={{ fontSize: 20 }} ta="center">
                QR Token {user?.full_name ? `for ${user.full_name}` : ""}
              </Text>
              <Text c="dimmed" ta="center">
                Show this QR code at the lunch counter
              </Text>

              <Card withBorder radius="md" p="md" w={260} h={260}>
                <Center h="100%">
                  {token ? (
                    statusData?.status === "expired" ? (
                      <Text c="orange.7" ta="center">
                        Token expired
                      </Text>
                    ) : (
                      <QRCode value={token} size={180} />
                    )
                  ) : todayData && todayData.status === "unsubscribed" ? (
                    <Text c="red.7" ta="center">
                      Please subscribe for this month to get a token
                    </Text>
                  ) : (
                    <Text c="dimmed">Fetching today's token…</Text>
                  )}
                </Center>
              </Card>
              {token && (
                <Badge
                  radius="sm"
                  color={statusData?.status === "expired" ? "orange" : "green"}
                >
                  {statusData?.status === "expired" ? "Expired" : "Active"}
                </Badge>
              )}

              <Card
                withBorder
                radius="md"
                p="md"
                w="100%"
                styles={{
                  root: {
                    background: theme.colors.yellow[0],
                    borderColor: theme.colors.yellow[4],
                  },
                }}
              >
                <Stack gap={6}>
                  <Text c="gray.7" fw={600}>
                    Warning
                  </Text>
                  <Text>This QR code is valid until 3:00 PM today.</Text>
                  <Divider />
                  <Text>• Each token can only be used once</Text>
                  <Text>
                    • Please present this to the admin at lunch counter
                  </Text>
                </Stack>
              </Card>
            </Stack>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 5 }}>
          <Card withBorder radius="md" p="md">
            <Stack gap="sm">
              <Text fw={600} c="gray.7" style={{ fontSize: 20 }}>
                How to Use
              </Text>
              <List type="ordered" spacing="xs">
                <List.Item>
                  Visit the lunch counter between 12:00 PM - 2:00 PM
                </List.Item>
                <List.Item>Show this QR code to the admin</List.Item>
                <List.Item>Wait for validation confirmation</List.Item>
                <List.Item>Enjoy your meal! 🍽️</List.Item>
              </List>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
