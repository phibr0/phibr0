import { experimental_taintUniqueValue } from "react";

export const env = (key: string, allowClient = false) => {
	const variable = process.env[key];
	if (!variable) {
		throw new Error(`Missing env ${key}`);
	}

	if (!allowClient) {
		experimental_taintUniqueValue(
			"Do not pass secret keys to the client.",
			process,
			variable,
		);
	}

	return variable;
};
