import { createTheme, type CSSVariablesResolver } from "@mantine/core";
// import { AuthModules, ROLES } from '../enums/enums';

export const theme = createTheme({
  primaryColor: "brand",
  // primaryShade: { light: 7, dark: 7 },
  colors: {
    brand: [
      "#e6faf5", // Lightest - backgrounds
      "#c7f4e8", // Very light - hover states
      "#8ee9d4", // Light - subtle accents
      "#52ddbf", // Medium light
      "#26d0ac", // Medium - emerald-400
      "#10b981", // Base - emerald-500 (primary)
      "#0d9668", // Medium dark - emerald-600
      "#0a7750", // Dark
      "#075c3d", // Very dark
      "#044a31", // Darkest - text on light
    ],
  },
  fontFamily: "Inter, sans-serif",
  components: {},
});

export const BackgroundLight = "#F0F3F9";

export const resolver: CSSVariablesResolver = () => ({
  dark: {},
  light: {},
  variables: {
    "--app-font-weight-semi-bold": "500",
  },
});

export const HEADER_HEIGHT = "40px";

export const NAVBAR_WIDTH = {
  COLLAPSED: 72,
  EXPANDED: 250,
};

export const MENU_LABELS = {
  DASHBOARD: "Dashboard",
  WORKFLOWS: "Workflows",
  PROCESSES: "Processes",
  STATUSES: "Statuses",
  DYNAMIC_FORMS: "Dynamic Forms",
  SETTINGS: "Settings",
  USER_MANAGEMENT: "Actor Management",
  API_KEY_MANAGEMENT: "API Key Management",
  SYSTEM_USER_MANAGEMENT: "User Management",
};
