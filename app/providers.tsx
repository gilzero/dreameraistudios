'use client';

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@components/ui/tooltip';
import { Toaster } from '@components/ui/toaster';
import { ThemeProvider } from 'next-themes';

// Initialize QueryClient on the client
// QueryClient instance is created inside component to avoid server->client serialization
export default function Providers({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          {children}
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
