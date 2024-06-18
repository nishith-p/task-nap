import { QueryClientProvider } from "@tanstack/react-query";

import { BrowserRouter as Router } from "react-router-dom";

import { queryClient } from "@/lib/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <Router>{children}</Router>
    </QueryClientProvider>
  );
};
