"use client";

import { useEffect } from "react";

export default function ErrorComponent({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="relative h-screen grid place-items-center">
			<div className="flex gap-6 flex-col items-center">
				<h1 className="text-4xl text-neutral-200 font-mono">
					Client-Side Error
				</h1>
				<p className="text-neutral-500">
					An error occurred while rendering the page. Check the console for more
					details.
				</p>

				<button
					type="button"
					onClick={reset}
					className="hover:underline no-underline mt-32 text-neutral-500"
				>
					Retry
				</button>
			</div>
		</div>
	);
}
