import { Box, Text } from "@mantine/core";

const Reports = () => {
  return (
    <Box
      style={{
        overflowY: "auto",
        overflowX: "hidden",
        height: "100%",
        padding: 12,
      }}
    >
      <Text style={{ fontSize: 36 }}>Reports & Analytics</Text>
      <Text c="dimmed" size="sm">
        View and export usage reports
      </Text>
    </Box>
  );
};

export default Reports;
