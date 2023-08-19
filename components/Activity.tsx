import Image from 'next/image';
import { SpotifyService } from 'spotify-now-playing';

export const WakatimeActivity: any = async () => {
  const wakatime = await fetch(
    'https://wakatime.com/api/v1/users/current/heartbeats?date=' +
      new Date().toDateString(),
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(process.env.WAKATIME_SECRET!),
      },
    },
  ).then((response) => response.json());

  const amCurrentlyCoding =
    new Date().getTime() -
      new Date(wakatime.data[wakatime.data.length - 1].created_at).getTime() <
    1000 * 60 * 5;

  if (amCurrentlyCoding) {
    return (
      <div className="flex w-full items-center gap-4 break-all text-sm text-neutral-600 dark:text-neutral-300">
        <div className="ml-2 grid grid-cols-1 grid-rows-1 place-items-center">
          <div className="col-[1] row-[1] h-2 w-2 animate-ping rounded-full bg-green-500 duration-1000" />
          <div className="col-[1] row-[1] h-2 w-2 rounded-full bg-green-500" />
        </div>
        <p>Online</p>
      </div>
    );
  }

  return (
    <div className="flex w-full items-center gap-4 break-all text-sm text-neutral-600 dark:text-neutral-300">
      <div className="ml-2 grid grid-cols-1 grid-rows-1 place-items-center">
        <div className="col-[1] row-[1] h-2 w-2 rounded-full bg-neutral-500" />
      </div>
      <p>Offline</p>
    </div>
  );
};

export const SpotifyActivity: any = async () => {
  const spotify = new SpotifyService(
    '7d51447045af4ac295b04ba2a3c2ee76',
    'a4cd4c513c024a308da72e22f8500ab3',
    'AQAFiCpHqgqlZivIApsCVceQiuOujbZFqMZN9hMAWPiQJAhYpwL_owoFCDsfYdJX7qiFvUD2FYAyCoqn22TsmJBbBzOtMz_2iXd31OoWFrDopxaK0xdJkTPn3q_wiBUFEt8',
  );
  const song = await spotify.getCurrentSong();

  if (song) {
    return (
      <div className="flex w-full items-center gap-4 break-all text-sm text-neutral-600 dark:text-neutral-300">
        <Image
          width={80}
          height={80}
          alt={song.title}
          src={song.album.image}
          className="rounded-md"
          priority
        />
        <div>
          <p className="mb-1 text-xs text-neutral-400">
            {song.isPlaying ? 'Currently listening to' : 'Last song played'}
          </p>
          <p className="hover:underline">
            <a href={song.url}>{song.title}</a>
          </p>
          <p>
            {Array.isArray(song.artists.name)
              ? song.artists.name.join(', ')
              : song.artists.name}
          </p>
        </div>
      </div>
    );
  }
};
