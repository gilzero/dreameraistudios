# Migration from Vite+Express to Next.js App Router

This document outlines the steps taken to migrate the Dreamer AI Studios website from a Vite+Express setup to Next.js with the App Router. The goal was to leverage Next.js's features like server-side rendering, improved routing, and optimized performance while maintaining the original design and functionality.

## Key Changes and Challenges

*   **Client/Server Component Boundaries:** The primary challenge was adapting the existing components to the Next.js App Router's client/server component model. Components with event handlers or using client-side state needed to be explicitly marked as client components using the `'use client'` directive.
*   **Import Paths:** The migration required updating import paths to align with Next.js's alias configuration. All imports using the `@/` alias needed to be adjusted to `@components/`, `@lib/`, or `@hooks/`.
*   **Styling:** The migration involved ensuring that global styles, CSS variables, and custom styling were correctly applied in the Next.js environment.
*   **React Query Setup:** React Query needed to be initialized correctly on the client-side to prevent serialization issues.
*   **Layout and Structure:** The overall layout and section structure needed to be preserved while adapting to Next.js's file-based routing.

## Migration Steps

1.  **Initial Setup and Configuration**

    *   Created a new Next.js project using `create-next-app`.
    *   Configured `next.config.js` to enable the `appDir` feature and set up the necessary aliases.
        *   **Note:** The `appDir` option was later removed as it's deprecated in newer Next.js versions.

2.  **Component Migration and Adaptation**

    *   **Header Component:**
        *   Added the `'use client'` directive to the [header.tsx](cci:7://file:///Users/apple/gilzero.dev/dreameraistudios/components/layout/header.tsx:0:0-0:0) component.
        *   Updated import paths for components like `Button` and utility functions.
        *   Modified the mobile menu toggle to work with client-side state.
    *   **MobileMenu Component:**
        *   Added the `'use client'` directive to the [mobile-menu.tsx](cci:7://file:///Users/apple/gilzero.dev/dreameraistudios/components/layout/mobile-menu.tsx:0:0-0:0) component.
        *   Updated import paths for components like `Button`.
    *   **Button Component:**
        *   Updated the import path for the `cn` utility function in [button.tsx](cci:7://file:///Users/apple/gilzero.dev/dreameraistudios/components/ui/button.tsx:0:0-0:0).
    *   **Toaster Component:**
        *   Added the `'use client'` directive to the [toaster.tsx](cci:7://file:///Users/apple/gilzero.dev/dreameraistudios/components/ui/toaster.tsx:0:0-0:0) component.
        *   Updated import paths for components like `Toast`.
    *   **useToast Hook:**
        *   Updated import paths for components like `Toast` in [use-toast.ts](cci:7://file:///Users/apple/gilzero.dev/dreameraistudios/hooks/use-toast.ts:0:0-0:0).
    *   **Page Component (app/page.tsx):**
        *   Added the `'use client'` directive to the [page.tsx](cci:7://file:///Users/apple/gilzero.dev/dreameraistudios/app/page.tsx:0:0-0:0) component.
        *   Implemented client-side state for the mobile menu toggle.
        *   Updated the component structure to include all the original sections.
    *   **WhySection Component:**
        *   Added the `'use client'` directive to the [why-section.tsx](cci:7://file:///Users/apple/gilzero.dev/dreameraistudios/components/sections/why-section.tsx:0:0-0:0) component.
        *   Updated import paths for components and utility functions.
    *   **WhoSection Component:**
        *   Added the `'use client'` directive to the [who-section.tsx](cci:7://file:///Users/apple/gilzero.dev/dreameraistudios/components/sections/who-section.tsx:0:0-0:0) component.
        *   Updated import paths for components and utility functions.

3.  **Styling and Layout Adjustments**

    *   **Global Styles (globals.css):**
        *   Added CSS variables for the theme system, including light and dark mode color schemes.
        *   Added custom Apple-inspired gradients and styling.
        *   Implemented global section styling to ensure full-width backgrounds using the `width: 100vw` and `margin-left: calc(-50vw + 50%)` technique.
        *   Added styles for `apple-card`, `quote-container`, `quote-mark`, `blur-backdrop`, `heading-serif`, and `hover-scale`.
    *   **Root Layout (app/layout.tsx):**
        *   Added `overflow-x-hidden` to the HTML and body elements to prevent horizontal scrollbars.
        *   Set `min-h-screen` and `w-full` on the body to ensure it spans the entire viewport.
        *   Added `scroll-smooth` to HTML for better scrolling behavior.

4.  **React Query Configuration**

    *   Created a client-side `QueryClient` instance in the `Providers` component ([providers.tsx](cci:7://file:///Users/apple/gilzero.dev/dreameraistudios/app/providers.tsx:0:0-0:0)).
    *   Made the `Providers` component accept optional children to avoid server-side rendering issues.

## Code Snippets

*   **Example of adding `'use client'` directive:**

    ```tsx
    "use client";

    import { useState } from 'react';
    // ... component code
    ```

*   **Example of updating import paths:**

    ```tsx
    import { Button } from "@components/ui/button";
    ```

*   **Example of global section styling in `globals.css`:**

    ```css
    section {
      width: 100vw !important;
      max-width: 100vw !important;
      position: relative;
      margin-left: calc(-50vw + 50%);
      margin-right: calc(-50vw + 50%);
      box-sizing: border-box;
    }
    ```

## Remaining Tasks

*   ✅ **Address the missing logo.png 404 errors:** Added the logo asset to the `public` directory.
*   ✅ **Review and optimize section animations:** Ensured all animations are smooth and performant in the Next.js environment.
*   ✅ **Implement proper error handling:** Added error boundaries and logging for improved debugging.
*   **Add tests:** Add unit and integration tests to ensure the application is working correctly.

## Legacy Files and Directories to Clean Up

Now that the migration is complete, the following files and directories are no longer needed and can be safely removed:

### Directories to Remove

1. **`/client/`**: The entire client directory contains the original Vite+React implementation and is no longer needed.
   - `/client/src/`: Contains the original React components
   - `/client/public/`: Original public assets (already migrated to `/public/`)

2. **`/server/`**: The original Express server implementation is no longer needed as we've migrated to Next.js API routes.
   - Contains server-side code like `index.ts`, `routes.ts`, `db.ts`, etc.

### Configuration Files to Remove

1. **`vite.config.ts`**: Vite configuration is no longer needed with Next.js.

2. **Legacy Dependencies**: The following dependencies in `package.json` can be removed:
   - `express` and related packages (`express-session`, `express-rate-limit`, etc.)
   - `vite` and related plugins
   - `@vitejs/plugin-react`
   - `@replit/vite-plugin-cartographer`
   - `@replit/vite-plugin-runtime-error-modal`
   - Other Vite-specific dependencies

### Files to Update

1. **`package.json`**: Update the name, version, and scripts to reflect the Next.js project.

2. **`tsconfig.json`**: Ensure it's properly configured for Next.js and remove any Vite-specific settings.

## Conclusion

The migration to Next.js App Router was successful, resulting in improved performance, better SEO, and a more maintainable codebase. The key challenges were addressed by carefully adapting the existing components to the new client/server component model and ensuring proper styling and layout configurations.

After cleaning up the legacy files and directories identified above, the codebase will be more streamlined and easier to maintain going forward. The design has been carefully preserved to match the original implementation while taking advantage of Next.js features.
