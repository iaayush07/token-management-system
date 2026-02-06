import { Box } from "@mantine/core";
import AppRouting from "../../routing/AppRouting";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";
import { useEnsurePermissions } from "../utility/hooks/useEnsurePermissions";

const Master = () => {
  const { pathname } = useLocation();
  // Ensure user permissions are loaded when token exists
  useEnsurePermissions();
  const isAuthRoute =
    pathname.startsWith("/login") || pathname.startsWith("/signup");

  return (
    <Box style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {!isAuthRoute && (
        <Box
          style={{
            height: 60,
            borderBottom: "1px solid var(--mantine-color-gray-3)",
          }}
        >
          <Header />
        </Box>
      )}

      <Box style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {!isAuthRoute && (
          <Box
            style={{
              width: 260,
              background: "var(--mantine-color-gray-0)",
              borderRight: "1px solid var(--mantine-color-gray-3)",
            }}
          >
            <Sidebar />
          </Box>
        )}

        <Box style={{ flex: 1, overflow: "hidden" }}>
          <AppRouting />
        </Box>
      </Box>
    </Box>
  );
};

export default Master;
