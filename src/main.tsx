/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
//@ts-ignore
import ReactDOM from "react-dom/profiling";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
