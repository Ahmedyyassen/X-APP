import { ThemeProvider } from "./components/ThemeProvider.tsx";
import { StrictMode } from "react";
import { Toaster } from "react-hot-toast";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./store/index.ts";

const client = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <ThemeProvider defaultTheme="dark" storageKey="x-theme">
          <App />
          <Toaster />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
