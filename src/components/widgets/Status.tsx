import { env } from "@/lib/env";
import { spotify } from "./Spotify";
import { MotionDiv } from "@/lib/framer-motion";
import { StatusIndicator } from "../common/StatusIndicator";

const isCoding = async () => {
	const wakatime = await fetch(
		`https://wakatime.com/api/v1/users/current/heartbeats?date=${new Date().toDateString()}`,
		{
			headers: {
				"Content-Type": "application/json",
				Authorization: `Basic ${btoa(env("WAKATIME_SECRET"))}`,
			},
		},
	).then((response) => response.json());

	const amCurrentlyCoding =
		wakatime?.data?.[wakatime.data.length - 1]?.created_at &&
		new Date().getTime() -
			new Date(wakatime.data[wakatime.data.length - 1].created_at).getTime() <
			1000 * 60 * 5;

	return amCurrentlyCoding;
};

const isPlayingSpotify = async () => {
	return !!(await spotify.getCurrentSong())?.isPlaying;
};

export const Status = async () => {
	const statuses = await Promise.all([isCoding(), isPlayingSpotify()]);
	const amOnline = statuses.some((status) => status);

	return (
		<MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
			<StatusIndicator
				status={amOnline ? "online" : "offline"}
				label={{
					offline: "Offline",
					online: "Online",
					degraded: "",
				}}
			/>
		</MotionDiv>
	);
};
