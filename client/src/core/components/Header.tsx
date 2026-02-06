import { Avatar, Group, Stack, Text, useMantineTheme } from "@mantine/core";

const Header = () => {
  const theme = useMantineTheme();

  const brandLight = theme.colors["brand"][3] || theme.colors.gray[1];
  const brandBase = theme.colors["brand"][6] || theme.colors.gray[5];

  return (
    <Group h={60} px="md" justify="space-between">
      <Group gap="sm">
        <Avatar
          radius={12}
          size={40}
          styles={{
            root: {
              background: `linear-gradient(135deg, ${brandBase}, ${brandLight})`,
              color: theme.white,
            },
            placeholder: {
              fontSize: 24,
            },
          }}
        >
          🍽️
        </Avatar>
        <Stack gap={0}>
          <Text style={{ fontSize: 20 }} fw={600} c="gray.7">
            Token Management
          </Text>
          <Text c="dimmed" size="xs">
            Lunch Access System
          </Text>
        </Stack>
      </Group>

      <Avatar radius={12} size={40} color="brand" variant="light"></Avatar>
    </Group>
  );
};

export default Header;
