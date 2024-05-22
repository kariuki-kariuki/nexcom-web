import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes.tsx";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import { MantineProvider } from "@mantine/core";
import AppProvider from "./context/appContext.tsx";
import ScreenProvider from "./context/screenContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme="dark">
      <AppProvider>
        <ScreenProvider>
          <RouterProvider router={router} />
        </ScreenProvider>
      </AppProvider>
    </MantineProvider>
  </React.StrictMode>
);
