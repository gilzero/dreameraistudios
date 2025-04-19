"use client";

import React, { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@components/ui/tooltip';
import { Toaster } from '@components/ui/toaster';

// Initialize QueryClient on the client
// QueryClient instance is created inside component to avoid server->client serialization
export default function Providers({ children }: { children?: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        {children}
      </TooltipProvider>
    </QueryClientProvider>
  );
}
