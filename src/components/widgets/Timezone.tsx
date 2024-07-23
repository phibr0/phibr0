'use client';

import React, { useMemo } from 'react';
import { ClientOnly } from '../common/ClientOnly';

export const Timezone = async () => {
  const [currentHour, myHour] = useMemo(() => {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const myTimeZone = 'Europe/Berlin';
    const date = new Date().setMinutes(0);
    const currentHour = new Date(date).toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
      timeZone: userTimeZone,
    });
    const myHour = new Date(date).toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
      timeZone: myTimeZone,
    });
    return [currentHour, myHour];
  }, []);
  return (
    <ClientOnly>
      <span>
        Your {currentHour} is my {myHour}.
      </span>
    </ClientOnly>
  );
};
