import { Box, NavLink, Stack, useMantineTheme } from "@mantine/core";
import {
  IconGauge,
  IconCalendarMonth,
  IconTicket,
  IconChartBar,
} from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";
import { PermissionGuard } from "../../auth/Authorization";

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

  const menuItems = [
    {
      title: "Dashboard",
      link: "/dashboard",
      icon: IconGauge,
      permission: "READ:Dashboard",
    },
    {
      title: "Monthly Subscription",
      link: "/monthly-subscription",
      icon: IconCalendarMonth,
      permission: "READ:MonthlySubscription",
    },
    {
      title: "Today's Token",
      link: "/todays-token",
      icon: IconTicket,
      permission: "READ:TodaysToken",
    },
    {
      title: "Month Configuration",
      link: "/admin/month-configuration",
      icon: IconCalendarMonth,
      permission: "READ:MonthConfiguration",
    },
    {
      title: "Reports",
      link: "/admin/reports",
      icon: IconChartBar,
      permission: "READ:Reports",
    },
  ] as const;

  const isActive = (link: string) => {
    if (link === "/dashboard")
      return pathname === "/dashboard" || pathname === "/";
    return pathname === link;
  };

  return (
    <Box h="100%" bg="gray.0" p={"md"}>
      <Stack gap="xs">
        {menuItems.map((item) => {
          const ActiveIcon = item.icon;
          const active = isActive(item.link);
          return (
            <PermissionGuard key={item.link} permission={item.permission}>
              <NavLink
                component={Link}
                to={item.link}
                leftSection={<ActiveIcon size={18} />}
                label={item.title}
                active={active}
                styles={linkStyles(active)}
              />
            </PermissionGuard>
          );
        })}
      </Stack>
    </Box>
  );
};

export default Sidebar;
