import { QueryClientProvider } from "@tanstack/react-query";

import { BrowserRouter as Router } from "react-router-dom";

import { queryClient } from "@/lib/react-query";
import { MantineProvider } from "@mantine/core";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <MantineProvider>
        <Router>{children}</Router>
      </MantineProvider>
    </QueryClientProvider>
  );
};
