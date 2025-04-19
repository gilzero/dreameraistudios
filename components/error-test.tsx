import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import useErrorBoundary from '@/hooks/use-error-boundary';

/**
 * Component that demonstrates error boundary functionality
 * by providing a button to trigger an intentional error
 */
interface ErrorTestProps {
  throwError?: boolean;
}

export default function ErrorTestComponent({
  throwError = false,
}: ErrorTestProps): JSX.Element {
  const [shouldThrow, setShouldThrow] = useState(throwError);

  // Use const as reset is assigned only once via hook
  const resetFn: () => void = useErrorBoundary(customFallback).reset;

  // Custom fallback UI with reset button
  const customFallback = (
    <div className="p-6 bg-[#ff3b30]/10 rounded-lg text-center">
      <h3 className="text-lg font-medium mb-2">Custom Error UI</h3>
      <p className="mb-4">
        This is a custom error fallback for this component.
      </p>
      <Button
        onClick={() => resetFn()}
        variant="outline"
        className="bg-white hover:bg-gray-50"
      >
        Reset Component
      </Button>
    </div>
  );

  // Use the error boundary hook
  const { ErrorBoundaryWrapper } = useErrorBoundary(customFallback);

  // This function will throw an error when called
  const triggerError = (): void => {
    setShouldThrow(true);
  };

  // This component will throw when shouldThrow is true
  const BuggyComponent = () => {
    if (shouldThrow) {
      // Intentionally throw an error for demonstration
      throw new Error('This is a test error to demonstrate error boundaries');
    }

    return (
      <div className="p-6 border border-[#e8e8ed] rounded-lg">
        <h3 className="text-lg font-medium mb-2">Error Boundary Test</h3>
        <p className="mb-4">
          Click the button below to trigger an error and see the error boundary
          in action.
        </p>
        <Button
          onClick={triggerError}
          className="bg-[#0071e3] hover:bg-[#0077ed] text-white"
        >
          Trigger Error
        </Button>
      </div>
    );
  };

  return (
    <ErrorBoundaryWrapper>
      <BuggyComponent />
    </ErrorBoundaryWrapper>
  );
}
