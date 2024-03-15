---
title: 'Client Only React Components'
slug: 'client-only'
date: '2024-02-04'
---

```tsx
import { PropsWithChildren, useSyncExternalStore } from 'react';

const emptySubscriber = () => () => {};

// https://x.com/TkDodo/status/1741068994981826947?s=20
export const ClientOnly = ({ children }: PropsWithChildren) => {
  const state = useSyncExternalStore(
    emptySubscriber,
    () => 'client',
    () => 'server'
  );

  return state === 'client' ? <>{children}</> : null;
};
```
