import { PropsWithChildren } from "react";
import { Head, Html } from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

export const Mail = ({ children }: PropsWithChildren) => (
	<Tailwind>
		<Html lang="en">
			<Head />
			{children}
		</Html>
	</Tailwind>
);
