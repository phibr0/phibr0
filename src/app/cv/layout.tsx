import { SuspenseErrorBoundary } from "@/components/common/SuspenseErrorBoundary";
import dynamic from "next/dynamic";
import { PropsWithChildren } from "react";

const Scene = dynamic(() => import("@/components/three/Scene"));

export default function Layout({ children }: PropsWithChildren) {
	return (
		<div className="relative h-screen">
			<div className="inset-0 absolute">
				<SuspenseErrorBoundary>
					<Scene />
				</SuspenseErrorBoundary>
			</div>
			<main className="z-50 relative">{children}</main>
		</div>
	);
}
