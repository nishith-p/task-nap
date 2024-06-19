import { BrowserRouter as Router } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { queryClient } from "@/lib/react-query";
import { theme } from "@/lib/mantine-theme";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <Router>{children}</Router>
      </MantineProvider>
    </QueryClientProvider>
  );
};
