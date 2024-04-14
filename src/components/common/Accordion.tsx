'use client';

import { cn } from '@/lib/cn';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import React from 'react';

export const AccordionRoot = Accordion.Root;

export const AccordionItem = React.forwardRef<
  HTMLDivElement,
  Accordion.AccordionItemProps
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Item
    className={cn('overflow-hidden', className)}
    {...props}
    ref={forwardedRef}
  >
    {children}
  </Accordion.Item>
));

export const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  Accordion.AccordionTriggerProps
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Header>
    <Accordion.Trigger
      className={cn(
        'flex justify-between py-1 px-2 rounded-md border border-transparent transition hover:border-neutral-600 group items-center w-full',
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
      <ChevronDownIcon
        className="ease-[cubic-bezier(0.87,_0,_0.13,_1)] text-neutral-500 transition-transform duration-300 group-data-[state=open]:rotate-180"
        aria-hidden
      />
    </Accordion.Trigger>
  </Accordion.Header>
));

export const AccordionContent = React.forwardRef<
  HTMLDivElement,
  Accordion.AccordionContentProps
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Content
    className={cn(
      'data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden',
      className
    )}
    {...props}
    ref={forwardedRef}
  >
    <div>{children}</div>
  </Accordion.Content>
));
