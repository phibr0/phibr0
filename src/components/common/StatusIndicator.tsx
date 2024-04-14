import React from "react";

interface StatusIndicatorProps {
	status: "online" | "offline" | "degraded";
	label: {
		online: string;
		offline: string;
		degraded: string;
	};
}

const statusColors = {
	online: "bg-green-500",
	offline: "bg-neutral-500",
	degraded: "bg-yellow-500",
};

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
	status,
	label,
}) => (
	<div className="flex w-full items-center gap-4 break-all text-sm text-neutral-600 dark:text-neutral-300">
		<div className="ml-2 grid place-items-center">
			{status !== "offline" && (
				<div
					className={`h-2 w-2 col-[1] row-[1] animate-ping rounded-full ${statusColors[status]} duration-1000`}
				/>
			)}
			<div
				className={`h-2 w-2 col-[1] row-[1] rounded-full ${statusColors[status]}`}
			/>
		</div>
		<p>{label[status]}</p>
	</div>
);
