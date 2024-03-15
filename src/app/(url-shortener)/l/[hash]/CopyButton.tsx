"use client";

import React from "react";

export const CopyButton = ({
	text,
	children,
	className,
}: {
	text: string;
	children?: React.ReactNode;
	className?: string;
}) => {
	return (
		<button
			type="button"
			className={className}
			onClick={() => navigator.clipboard.writeText(text)}
		>
			{children}
		</button>
	);
};
