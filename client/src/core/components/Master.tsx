import { Box } from "@mantine/core";
import AppRouting from "../../routing/AppRouting";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Master = () => {
  return (
    <Box style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Box
        style={{
          height: 60,
          borderBottom: "1px solid var(--mantine-color-gray-3)",
        }}
      >
        <Header />
      </Box>

      <Box style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <Box
          style={{
            width: 260,
            background: "var(--mantine-color-gray-0)",
            borderRight: "1px solid var(--mantine-color-gray-3)",
          }}
        >
          <Sidebar />
        </Box>

        <Box style={{ flex: 1, overflow: "hidden" }}>
          <AppRouting />
        </Box>
      </Box>
    </Box>
  );
};

export default Master;
