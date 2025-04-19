'use client';

import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT_PX = 768; // Example breakpoint (adjust as needed)

export function useIsMobile(defaultValue = false): boolean {
  const [isMobile, setIsMobile] = useState(defaultValue);

  useEffect(() => {
    // Ensure window is defined (runs only on client)
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia(
      `(max-width: ${MOBILE_BREAKPOINT_PX - 1}px)`
    );

    const checkDevice = () => {
      setIsMobile(mediaQuery.matches);
    };

    // Initial check
    checkDevice();

    // Listen for changes
    // Note: Using addEventListener/removeEventListener for compatibility
    mediaQuery.addEventListener('change', checkDevice);

    // Cleanup listener on component unmount
    return () => {
      mediaQuery.removeEventListener('change', checkDevice);
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return isMobile;
}
