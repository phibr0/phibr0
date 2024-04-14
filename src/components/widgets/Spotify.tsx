import Image from 'next/image';
import React from 'react';
import { SpotifyService } from 'spotify-now-playing';
import { env } from '@/lib/env';
import { MotionDiv } from '@/lib/framer-motion';

export const spotify = new SpotifyService(
  env('SPOTIFY_CLIENT_ID'),
  env('SPOTIFY_CLIENT_SECRET'),
  env('SPOTIFY_REFRESH_TOKEN')
);

export const Spotify = async () => {
  const song = await spotify.getCurrentSong();

  if (song) {
    return (
      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex w-full items-center gap-4 break-all text-sm text-neutral-600 dark:text-neutral-300"
      >
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
      </MotionDiv>
    );
  }
};
