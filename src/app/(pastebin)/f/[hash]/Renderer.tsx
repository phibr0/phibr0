"use client";

import { transition } from "@/lib/transition";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { decryptText, importKey } from "../crypto";

export const Renderer = ({ cypher }: { cypher: string }) => {
	const ref = useRef<HTMLPreElement>(null);
	const { push } = useRouter();

	useEffect(() => {
		const fn = async () => {
			try {
				const url = new URL(window.location.href);
				const [publicKey, iv] = url.hash.slice(1).split("$");
				const key = await importKey(atob(publicKey));
				const decrypted = await decryptText(cypher, key, iv);
				transition(() => {
					if (!ref.current) return;
					ref.current.innerHTML = decrypted;
				});
			} catch (error) {
				if (!ref.current) return;
				ref.current.innerHTML = "Invalid Key";
			}
		};
		fn();
	}, [cypher, push]);

	return <pre ref={ref} className="text-neutral-700" />;
};
