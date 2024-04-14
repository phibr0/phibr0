'use client';

import { Button, Heading } from '@radix-ui/themes';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="size-full flex text-center flex-col gap-4 items-center lg:py-32 py-64">
      <Heading>Something went wrong!</Heading>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
