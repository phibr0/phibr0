import { PropsWithChildren } from 'react';
import { Html } from '@react-email/html';
import { Head } from '@react-email/head';
import { Tailwind } from '@react-email/tailwind';

export const Mail = ({ children }: PropsWithChildren) => (
  <Tailwind>
    <Html lang="en">
      <Head />
      {children}
    </Html>
  </Tailwind>
);
