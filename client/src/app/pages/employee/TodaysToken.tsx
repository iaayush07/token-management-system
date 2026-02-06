import {
  Box,
  Text,
  Card,
  Stack,
  Center,
  Group,
  Avatar,
  Badge,
  Divider,
  Grid,
  List,
  useMantineTheme,
} from "@mantine/core";
import { IconClock, IconQrcode } from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";

export default function TodaysToken() {
  const theme = useMantineTheme();
  const [remaining, setRemaining] = useState<string>("--:--:--");

  const blueLight = theme.colors.blue[3];
  const blueBase = theme.colors.blue[6];

  const expiry = useMemo(() => {
    const d = new Date();
    d.setHours(14, 0, 0, 0); // 2:00 PM today
    return d;
  }, []);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const diff = expiry.getTime() - now.getTime();
      if (diff <= 0) {
        setRemaining("Expired");
        return;
      }
      const s = Math.floor(diff / 1000);
      const h = Math.floor(s / 3600);
      const m = Math.floor((s % 3600) / 60);
      const sec = s % 60;
      setRemaining(`${h}h ${m}m ${sec}s`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [expiry]);

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
                QR Token for John Doe
              </Text>
              <Text c="dimmed" ta="center">
                Show this QR code at the lunch counter
              </Text>

              <Card withBorder radius="md" p="md" w={260} h={260}>
                <Center h="100%">
                  <IconQrcode
                    size={180}
                    style={{ color: theme.colors.gray[8] }}
                  />
                </Center>
              </Card>

              <Card
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

                  <Badge color="blue" radius="sm">
                    Active
                  </Badge>
                </Group>
              </Card>

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
                    This QR code is valid only for today and expires at 2:00 PM
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
