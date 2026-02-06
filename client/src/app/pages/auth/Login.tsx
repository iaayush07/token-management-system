import {
  Anchor,
  Button,
  Card,
  Group,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../shared/utility/services/auth.service";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async () => {
    try {
      const res = await login({ email, password }).unwrap();
      if (res.token) {
        // Store token in localStorage so ProtectedRoute and Axios header pick it up
        localStorage.setItem("tm_token", res.token);

        notifications.show({
          title: "Welcome back",
          message: "Login successful",
          color: "green",
        });
        navigate("/dashboard", { replace: true });
      }
    } catch (e: any) {
      const message = e?.response?.data?.message || "Invalid credentials";
      notifications.show({ title: "Login failed", message, color: "red" });
    }
  };

  return (
    <Group justify="center" align="center" h="100%">
      <Card shadow="sm" radius={16} w={400} p="lg">
        <Stack gap="md">
          <Text fw={700} size="lg">
            Sign in to Token Management
          </Text>
          <TextInput
            label="Email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <PasswordInput
            label="Password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <Button loading={isLoading} onClick={onSubmit} color="brand">
            Sign In
          </Button>
          <Text size="sm" c="dimmed">
            Don't have an account?{" "}
            <Anchor component={Link} to="/signup">
              Create one
            </Anchor>
          </Text>
        </Stack>
      </Card>
    </Group>
  );
};

export default Login;
