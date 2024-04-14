import { ActionButton } from "@/components/common/ActionButton";
import { auth, signIn } from "@/lib/auth";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
	const session = await auth();

	if (!session) {
		return (
			<form
				className="flex px-8 pt-64 justify-center items-center"
				action={async () => {
					"use server";
					await signIn("github");
				}}
			>
				<ActionButton icon={<GitHubLogoIcon />} size="3" type="submit">
					Authentifizieren
				</ActionButton>
			</form>
		);
	}

	return children;
}
