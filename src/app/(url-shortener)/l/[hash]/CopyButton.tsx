'use client';

import { Button } from '@radix-ui/themes';
import React from 'react';

export const CopyButton = ({
  text,
  children,
  className,
}: {
  text: string;
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <Button variant="ghost" onClick={() => navigator.clipboard.writeText(text)}>
      {children}
    </Button>
  );
};
