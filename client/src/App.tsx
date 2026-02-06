import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { Provider } from "react-redux";
import Master from "./core/components/Master";
import { resolver, theme } from "./core/utility/constants/core.constant";
import { appStore } from "./store/store";

function App() {
  return (
    <MantineProvider
      theme={theme}
      cssVariablesResolver={resolver}
      // defaultColorScheme={getSystemTheme()}
    >
      <Notifications position="top-right" zIndex={1000} />
      <Provider store={appStore}>
        <Master />
      </Provider>
    </MantineProvider>
  );
}

export default App;
