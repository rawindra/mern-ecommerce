import { FC, ReactNode, useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

interface ReactQueryProviderProps {
    children: ReactNode;
}

const queryClientOptions = {
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 0,
        },
    },
};

const ReactQueryProvider: FC<ReactQueryProviderProps> = ({ children }) => {
    const [queryClient] = useState(() => new QueryClient(queryClientOptions));
    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};

export default ReactQueryProvider;
