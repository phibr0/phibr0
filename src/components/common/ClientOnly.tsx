"use client";

import { PropsWithChildren, useSyncExternalStore } from "react";

// https://x.com/TkDodo/status/1741068994981826947?s=20
export const ClientOnly = ({ children }: PropsWithChildren) => {
	const state = useSyncExternalStore(
		() => () => {},
		() => "client",
		() => "server",
	);

	return state === "client" ? <>{children}</> : null;
};
