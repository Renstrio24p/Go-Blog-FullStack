import { ReactNode } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

type Props = {
  children: ReactNode;
};

export default function Hydrate({ children }: Props) {
  const [isHydrated, setIsHydrated] = useState(false);

  const queryClient = new QueryClient();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null;
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </>
  );
}
