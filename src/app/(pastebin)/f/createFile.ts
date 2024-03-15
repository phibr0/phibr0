"use server";

import { kv } from "@vercel/kv";

export const createFile = async (hash: string, cypherText: string) => {
	await kv.set(hash, cypherText);
};
