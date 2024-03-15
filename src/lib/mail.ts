import { SendMailOptions, createTransport } from "nodemailer";
import { env } from "./env";

const RECIPIENT = env("GMAIL_RECIPIENT");
const SENDER = env("GMAIL_SENDER");
const PASSWORD = env("GMAIL_APP_PASSWORD");

const client = createTransport({
	service: "Gmail",
	auth: {
		user: SENDER,
		pass: PASSWORD,
	},
});

export const mail = async (message: Omit<SendMailOptions, "from" | "to">) => {
	return await client.sendMail({
		from: SENDER,
		to: RECIPIENT,
		...message,
	});
};
