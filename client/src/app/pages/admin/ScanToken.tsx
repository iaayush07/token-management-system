import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  Group,
  Stack,
  Text,
  TextInput,
  List,
  useMantineTheme,
} from "@mantine/core";
import { IconCamera } from "@tabler/icons-react";
import { QrReader } from "react-qr-reader";
import { useScanQrMutation } from "./utility/services/token-management.service";

const ScanToken = () => {
  const theme = useMantineTheme();
  const [cameraOn, setCameraOn] = useState(false);
  const [scannedText, setScannedText] = useState<string>("");
  const [manualToken, setManualToken] = useState<string>("");
  const [validationMessage, setValidationMessage] = useState<string>("");
  const [validationError, setValidationError] = useState<string>("");
  const [scanQr, { isLoading: isValidating }] = useScanQrMutation();

  return (
    <Box
      style={{
        overflowY: "auto",
        overflowX: "hidden",
        height: "100%",
        padding: 12,
      }}
    >
      <Text style={{ fontSize: 36 }}>Scan Token</Text>
      <Text c="dimmed" size="sm">
        Use camera to scan or validate manually
      </Text>

      <Grid mt="md" gutter="md">
        {/* Grid 8 - Two cards */}
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Stack gap="md">
            <Card withBorder radius="md" p="md">
              <Stack align="center" gap="sm">
                <Avatar
                  size={80}
                  radius={24}
                  styles={{
                    root: {
                      background: `linear-gradient(135deg, ${theme.colors.blue[6]}, ${theme.colors.blue[3]})`,
                      color: theme.white,
                    },
                  }}
                >
                  <IconCamera size={40} style={{ color: "white" }} />
                </Avatar>

                <Text fw={700} style={{ fontSize: 18 }}>
                  Ready to Scan
                </Text>
                <Text c="dimmed" ta="center">
                  Click the button below to start scanning
                </Text>

                {!cameraOn && (
                  <Button onClick={() => setCameraOn(true)}>
                    Start Camera
                  </Button>
                )}

                {cameraOn && (
                  <Stack w="100%" gap="xs">
                    <QrReader
                      constraints={{ facingMode: "environment" }}
                      onResult={async (result) => {
                        try {
                          const text =
                            // Support different result shapes across versions
                            (result as any)?.getText?.() ??
                            (result as any)?.text ??
                            "";
                          if (text) {
                            setScannedText(text);
                            // Auto stop camera after successful scan and validate
                            setCameraOn(false);
                            setValidationError("");
                            setValidationMessage("");
                            try {
                              const res = await scanQr({
                                token: text,
                              }).unwrap();
                              console.log(res, "any");

                              setValidationMessage(
                                `${res.message} (User: ${res.userId})`,
                              );
                            } catch (e: any) {
                              const msg =
                                e?.data?.message ?? "Validation failed";
                              setValidationError(msg);
                            }
                          }
                        } catch {}
                      }}
                      containerStyle={{ width: "100%" }}
                      videoStyle={{ width: "100%" }}
                    />
                    <Group justify="space-between">
                      <Text size="sm" c="dimmed">
                        {isValidating ? "Validating..." : "Scanning..."}
                      </Text>
                      <Button
                        variant="light"
                        color="gray"
                        onClick={() => setCameraOn(false)}
                      >
                        Stop Camera
                      </Button>
                    </Group>
                  </Stack>
                )}

                {scannedText && (
                  <Stack w="100%" gap={4}>
                    <Text fw={600}>Scanned Token</Text>
                    <Card
                      withBorder
                      radius="sm"
                      p="xs"
                      styles={{ root: { background: theme.colors.gray[0] } }}
                    >
                      <Text size="sm" style={{ wordBreak: "break-word" }}>
                        {scannedText}
                      </Text>
                    </Card>
                    {validationMessage && (
                      <Text c="green.7" size="sm">
                        {validationMessage}
                      </Text>
                    )}
                    {validationError && (
                      <Text c="red.7" size="sm">
                        {validationError}
                      </Text>
                    )}
                    <Group justify="flex-end">
                      <Button
                        onClick={async () => {
                          setValidationError("");
                          setValidationMessage("");
                          try {
                            const res = await scanQr({
                              token: scannedText,
                            }).unwrap();
                            setValidationMessage(
                              `${res.message} (User: ${res.userId})`,
                            );
                          } catch (e: any) {
                            const msg = e?.data?.message ?? "Validation failed";
                            setValidationError(msg);
                          }
                        }}
                      >
                        Validate
                      </Button>
                    </Group>
                  </Stack>
                )}
              </Stack>
            </Card>
            <Card withBorder radius="md" p="md">
              <Stack gap="sm">
                <Text fw={700} style={{ fontSize: 18 }}>
                  Manual Validation
                </Text>
                <Text c="dimmed">
                  Enter token data manually if camera is unavailable
                </Text>
                <Group align="flex-end" wrap="nowrap">
                  <TextInput
                    placeholder="Enter token"
                    flex={1}
                    value={manualToken}
                    onChange={(e) => setManualToken(e.currentTarget.value)}
                  />
                  <Button
                    onClick={async () => {
                      if (!manualToken) return;
                      setScannedText(manualToken);
                      setValidationError("");
                      setValidationMessage("");
                      try {
                        const res = await scanQr({
                          token: manualToken,
                        }).unwrap();
                        setValidationMessage(
                          `${res.message} (User: ${res.userId})`,
                        );
                      } catch (e: any) {
                        const msg = e?.data?.message ?? "Validation failed";
                        setValidationError(msg);
                      }
                    }}
                    disabled={!manualToken || isValidating}
                  >
                    Validate
                  </Button>
                </Group>
              </Stack>
            </Card>
          </Stack>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card withBorder radius="md" padding="md">
            <Stack gap={5}>
              <Text size="lg" fw={500}>
                Validation Instructions
              </Text>
              <Stack gap={5}>
                <List type="ordered" spacing="xs">
                  <List.Item>Click "Start Camera" to begin scanning</List.Item>
                  <List.Item>Ask employee to show their QR token</List.Item>
                  <List.Item>
                    Position the QR code within the camera frame
                  </List.Item>
                  <List.Item>
                    System will automatically validate and show results
                  </List.Item>
                  <List.Item>
                    Each token can only be used once per day
                  </List.Item>
                </List>
              </Stack>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default ScanToken;
