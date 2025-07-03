import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "@mantine/core/styles.css"; // Import Mantine styles
import { MantineProvider } from "@mantine/core";
import "./index.css";
import NavHeader from "./components/NavHeader.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MantineProvider defaultColorScheme="dark">
      <>
        <App />
      </>
    </MantineProvider>
  </StrictMode>
);
