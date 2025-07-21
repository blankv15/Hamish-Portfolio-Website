import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "@mantine/core/styles.css"; // Import Mantine styles
import { MantineProvider } from "@mantine/core";
import "./index.css";
import Navbar from "./components/Navbar.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import ProjectDetailPage from "./components/ProjectDetailPage.jsx";
import { Notifications } from '@mantine/notifications';


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MantineProvider >
      <>
        <Navbar />
        <Notifications/ >

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />

          </Routes>
        </BrowserRouter>

      </>
    </MantineProvider>
  </StrictMode>
);
