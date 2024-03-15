"use client";

import { cn } from "@/lib/cn";
import { useFormStatus } from "react-dom";

export const CreateButton = () => {
	const { pending } = useFormStatus();
	return (
		<button
			type="submit"
			className={cn(
				"px-4 py-1 rounded-sm bg-neutral-900 border-neutral-700 border hover:bg-neutral-800 transition-all",
				{ "opacity-50 cursor-not-allowed": pending },
			)}
		>
			Creat{pending ? "ing" : "e"}
		</button>
	);
};
