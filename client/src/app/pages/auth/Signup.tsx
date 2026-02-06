import { useState } from "react";
import {
  Anchor,
  Button,
  Card,
  Group,
  Stack,
  Text,
  TextInput,
  PasswordInput,
  Select,
} from "@mantine/core";
import { useSignupMutation } from "../../../shared/utility/services/auth.service";
import { notifications } from "@mantine/notifications";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<string | null>("EMPLOYEE");
  const [signup, { isLoading }] = useSignupMutation();

  const onSubmit = async () => {
    try {
      await signup({
        fullName,
        email,
        password,
        role: role ?? undefined,
      }).unwrap();
      notifications.show({
        title: "Account created",
        message: "You can now sign in",
        color: "green",
      });
      navigate("/login", { replace: true });
    } catch (e: any) {
      const message = e?.response?.data?.message || "Failed to create account";
      notifications.show({ title: "Signup error", message, color: "red" });
    }
  };

  return (
    <Group justify="center" align="center" h="100%">
      <Card shadow="sm" radius={16} w={480} p="lg">
        <Stack gap="md">
          <Text fw={700} size="lg">
            Create your account
          </Text>
          <TextInput
            label="Full Name"
            placeholder="Jane Doe"
            value={fullName}
            onChange={(e) => setFullName(e.currentTarget.value)}
          />
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
          <Select
            label="Role"
            data={[
              { value: "EMPLOYEE", label: "Employee" },
              { value: "ADMIN", label: "Admin" },
            ]}
            value={role}
            onChange={setRole}
          />
          <Button loading={isLoading} onClick={onSubmit} color="brand">
            Create Account
          </Button>
          <Text size="sm" c="dimmed">
            Already have an account?{" "}
            <Anchor component={Link} to="/login">
              Sign in
            </Anchor>
          </Text>
        </Stack>
      </Card>
    </Group>
  );
};

export default Signup;
