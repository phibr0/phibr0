'use client';

import { Button, ButtonProps, Spinner } from '@radix-ui/themes';
import { PropsWithChildren, ReactNode } from 'react';
import { useFormStatus } from 'react-dom';

export const ActionButton = ({
  children,
  icon,
  ...props
}: PropsWithChildren<
  {
    icon: ReactNode;
  } & ButtonProps
>) => {
  const status = useFormStatus();
  return (
    <Button disabled={status.pending} {...props}>
      <Spinner loading={status.pending}>{icon}</Spinner>
      {children}
    </Button>
  );
};
