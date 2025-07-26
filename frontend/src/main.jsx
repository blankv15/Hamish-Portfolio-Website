import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import "./index.css";
import Navbar from "./components/Navbar.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MantineProvider>
      {/* Wrap the entire application with BrowserRouter */}
      <BrowserRouter>
        <Navbar />
        <App />
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>
);