import {
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
import { useGenerateQRMutation } from "./utility/services/employee.service";

export default function TodaysToken() {
  const theme = useMantineTheme();
  const [token, setToken] = useState<string | null>(null);
  const raw = sessionStorage.getItem("tm_user");
  const user = raw ? JSON.parse(raw) : null;
  const [triggerGenerateQR, { isLoading: generating }] =
    useGenerateQRMutation();

  useEffect(() => {
    if (token !== null) return; // Token already generated for this session
    if (!user?.id || generating) return;
    const generate = async () => {
      // Prevent duplicate calls across dev StrictMode mounts by short-circuiting
      const lastGen = sessionStorage.getItem("tm_last_qr_gen");
      if (lastGen && Date.now() - Number(lastGen) < 3000) return;
      try {
        const userId = String(user.id);
        const res = await triggerGenerateQR({ userId }).unwrap();
        const tok = (res as any)?.token as string;
        setToken(tok);
        const end = new Date();
        end.setMinutes(end.getMinutes() + 10);
        sessionStorage.setItem("tm_last_qr_gen", String(Date.now()));
      } catch (e) {
        // Silent failure; UI remains with placeholder
      }
    };
    generate();
    // regenerate when user changes
  }, [user.id, token]);

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
                    <QRCode value={token} size={180} />
                  ) : (
                    <Text c="dimmed">Generate your QR token</Text>
                  )}
                </Center>
              </Card>

              {/* QR generates on load; no button required */}

              {/* <Card
                withBorder
                radius="md"
                p="md"
                w="100%"
                styles={{
                  root: {
                    background: theme.colors.blue[0],
                  },
                }}
              >
                <Group justify="space-between" align="center">
                  <Group>
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
                    <Stack gap={0}>
                      <Text fw={600} c="gray.7">
                        Time Remaining
                      </Text>
                      <Text c="gray.7">{remaining}</Text>
                    </Stack>
                  </Group>

                  <Badge
                    color={remaining === "Expired" ? "red" : "blue"}
                    radius="sm"
                  >
                    {remaining === "Expired"
                      ? "Expired"
                      : token
                        ? "Active"
                        : "Idle"}
                  </Badge>
                </Group>
              </Card> */}

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
                  <Text>
                    This QR code is valid for 10 minutes after generation.
                  </Text>
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
