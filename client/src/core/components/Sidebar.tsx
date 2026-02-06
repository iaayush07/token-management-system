import { Box, NavLink, Stack, useMantineTheme } from "@mantine/core";
import {
  IconGauge,
  IconCalendarMonth,
  IconTicket,
  IconChartBar,
} from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const theme = useMantineTheme();
  const { pathname } = useLocation();

  const brandLight = theme.colors["brand"][3] || theme.colors.gray[1];
  const brandBase = theme.colors["brand"][6] || theme.colors.gray[5];
  const headerTextColor = theme.colors.gray[7];

  const linkStyles = (isActive: boolean) => ({
    root: {
      background: isActive
        ? `linear-gradient(135deg, ${brandBase}, ${brandLight})`
        : "transparent",
      color: isActive ? theme.white : headerTextColor,
      borderRadius: 12,
    },
    label: {
      color: isActive ? theme.white : headerTextColor,
      fontWeight: 600,
    },
    icon: {
      color: isActive ? theme.white : headerTextColor,
    },
  });

  const isDashboard = pathname === "/dashboard" || pathname === "/";
  const isMonthly = pathname === "/monthly-subscription";
  const isToday = pathname === "/todays-token";
  const isAdminMonth = pathname === "/admin/month-configuration";
  const isAdminReports = pathname === "/admin/reports";

  return (
    <Box h="100%" bg="gray.0" p={"md"}>
      <Stack gap="xs">
        <NavLink
          component={Link}
          to="/dashboard"
          leftSection={<IconGauge size={18} />}
          label="Dashboard"
          active={isDashboard}
          styles={linkStyles(isDashboard)}
        />
        <NavLink
          component={Link}
          to="/monthly-subscription"
          leftSection={<IconCalendarMonth size={18} />}
          label="Monthly Subscription"
          active={isMonthly}
          styles={linkStyles(isMonthly)}
        />
        <NavLink
          component={Link}
          to="/todays-token"
          leftSection={<IconTicket size={18} />}
          label={"Today's Token"}
          active={isToday}
          styles={linkStyles(isToday)}
        />
        <NavLink
          component={Link}
          to="/admin/month-configuration"
          leftSection={<IconCalendarMonth size={18} />}
          label="Month Configuration"
          active={isAdminMonth}
          styles={linkStyles(isAdminMonth)}
        />
        <NavLink
          component={Link}
          to="/admin/reports"
          leftSection={<IconChartBar size={18} />}
          label="Reports"
          active={isAdminReports}
          styles={linkStyles(isAdminReports)}
        />
      </Stack>
    </Box>
  );
};

export default Sidebar;
