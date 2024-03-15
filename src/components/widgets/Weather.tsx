import { env } from "@/lib/env";

export const Weather = async () => {
	const weather = (
		await fetch(
			`https://api.weatherapi.com/v1/current.json?q=Marl&key=${env(
				"WEATHER_API_KEY",
			)}`,
			{
				next: { revalidate: 60 * 60 },
			},
		).then((response) => response.json())
	).current;

	const condition = weather.condition;

	return (
		<span>
			It&apos;s currently {condition.text.toLowerCase()} with {weather.temp_c}{" "}
			°C here where I live.
		</span>
	);
};
