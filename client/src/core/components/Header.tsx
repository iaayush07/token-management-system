import {
  Avatar,
  Button,
  Group,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { useAppDispatch } from "../../store/store";
import { tokenManagerService } from "../../shared/utility/services/token-management.service";
import { generateInitials } from "../../shared/utility/helpers/token-management.helper";

const Header = () => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userName = sessionStorage.getItem("tm_user")
    ? JSON.parse(sessionStorage.getItem("tm_user")!).fullName
    : "User";

  const brandLight = theme.colors["brand"][3] || theme.colors.gray[1];
  const brandBase = theme.colors["brand"][6] || theme.colors.gray[5];

  const handleLogout = () => {
    // Clear all client-side storage for a clean logout
    try {
      localStorage.clear();
    } catch {}
    try {
      sessionStorage.clear();
    } catch {}
    dispatch(tokenManagerService.util.resetApiState());
    notifications.show({
      title: "Logged out",
      message: "See you next time",
      color: "gray",
    });
    navigate("/login", { replace: true });
  };

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

      <Group gap="sm">
        <Avatar radius={12} size={40} color="brand" variant="light">
          {generateInitials(userName)}
        </Avatar>
        <Button variant="light" color="brand" onClick={handleLogout}>
          Logout
        </Button>
      </Group>
    </Group>
  );
};

export default Header;
