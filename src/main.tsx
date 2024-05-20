import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes.tsx";
import "@mantine/core/styles.css";
import '@mantine/carousel/styles.css';
import { MantineProvider } from "@mantine/core";
import AppProvider from "./context/appContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme="dark">
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </MantineProvider>
  </React.StrictMode>
);
