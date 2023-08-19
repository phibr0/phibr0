export const CurrentWeather = async () => {
  const weather = (
    await fetch(
      "https://api.weatherapi.com/v1/current.json?q=Marl&key=11200eec0ec84a7f9ba142513231908",
      { next: { revalidate: 3600 } }
    ).then((response) => response.json())
  ).current

  const condition = weather.condition
  return (
    <span>
      It&apos;s currently {condition.text.toLowerCase()} with {weather.temp_c}{" "}
      °C where I live.
    </span>
  )
}
