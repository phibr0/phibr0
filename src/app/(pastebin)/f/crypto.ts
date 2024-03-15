export const createHash = async (text: string) => {
	const encoder = new TextEncoder();
	const data = encoder.encode(text);
	const hash = await crypto.subtle.digest("SHA-1", data);
	const hashArray = Array.from(new Uint8Array(hash));
	const hashHex = hashArray
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");
	return hashHex;
};

export async function generateKey() {
	return window.crypto.subtle.generateKey(
		{
			name: "AES-GCM",
			length: 128,
		},
		true,
		["encrypt", "decrypt"],
	);
}

export async function encryptText(plainText: string, key: CryptoKey) {
	const encodedText = new TextEncoder().encode(plainText);
	const iv = crypto.getRandomValues(new Uint8Array(8));

	const encrypted = await window.crypto.subtle.encrypt(
		{
			name: "AES-GCM",
			iv,
		},
		key,
		encodedText,
	);

	return {
		encrypted,
		iv: btoa(String.fromCharCode(...new Uint8Array(iv))),
	};
}

export async function decryptText(
	encrypted: string,
	key: CryptoKey,
	iv: string,
) {
	const decrypted = await window.crypto.subtle.decrypt(
		{
			name: "AES-GCM",
			iv: Uint8Array.from(atob(iv), (c) => c.charCodeAt(0)),
		},
		key,
		Uint8Array.from(atob(encrypted), (c) => c.charCodeAt(0)),
	);

	return new TextDecoder().decode(decrypted);
}

export const importKey = async (key: string) => {
	return await crypto.subtle.importKey(
		"raw",
		Uint8Array.from(key, (c) => c.charCodeAt(0)),
		"AES-GCM",
		true,
		["encrypt", "decrypt"],
	);
};
