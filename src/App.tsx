import { GlobalStyled } from "./configs/global/GlobalStyled";
import { AppRoutes } from "./configs/routes/AppRoutes";
import { ThemeProvider } from "@mui/material";
import { lightTheme } from "./configs/themes/lightTheme";
import { darkTheme } from "./configs/themes/darkTheme";
import { useAppSelector } from "./store/hooks";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  const { mode } = useAppSelector((state) => state.settings);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
          <GlobalStyled />
          <AppRoutes />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
