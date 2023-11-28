'use client';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import { Tab } from '@headlessui/react';

//
// Tab Item framer motion variant
//
export function TabItem({
  children,
  className,
  motionClassName,
  motionLayoutId,
  ...props
}: React.PropsWithChildren<{
  className?: string;
  motionClassName?: string;
  motionLayoutId?: string;
  [key: string]: any;
}>) {
  return (
    <Tab
      className={({ selected }) =>
        clsx(
          'relative pb-4 text-sm capitalize tracking-wide text-gray focus:outline-none lg:text-base',
          selected && 'tab-text-shadow !text-gray-dark',
          className
        )
      }
      {...props}
    >
      {({ selected }) => (
        <>
          <span className="md:px-0">{children}</span>
          {selected && (
            <motion.span
              className={clsx(
                'absolute bottom-0 left-0 right-0 z-10 h-0.5 w-full rounded-full bg-gray-dark lg:h-1',
                motionClassName
              )}
              layoutId={motionLayoutId}
            />
          )}
        </>
      )}
    </Tab>
  );
}

//
// Tab Panels
//
export function TabPanels({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <Tab.Panels className={className}>
      <>{children}</>
    </Tab.Panels>
  );
}

//
// Tab Panel
//
export function TabPanel({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return <Tab.Panel className={className}>{children}</Tab.Panel>;
}

//
// Tab Panel
//
export function Tablist({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return <Tab.List className={className}>{children}</Tab.List>;
}
