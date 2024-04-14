"use client";

import { PropsWithChildren, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export const SuspenseErrorBoundary = ({
	children,
	fallback,
}: PropsWithChildren<{
	fallback?: React.ReactNode;
}>) => (
	<ErrorBoundary fallback={null}>
		<Suspense fallback={fallback ?? <div />}>{children}</Suspense>
	</ErrorBoundary>
);
