import { QueryClientProvider } from "@tanstack/react-query";

import { BrowserRouter as Router } from "react-router-dom";

import { queryClient } from "@/lib/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TooltipProvider } from "@/components/ui/tooltip";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ReactQueryDevtools />
        <Router>{children}</Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};
