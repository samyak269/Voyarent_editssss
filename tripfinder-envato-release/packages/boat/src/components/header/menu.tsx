'use client';

import Link from 'next/link';
import useAuth from '@/hooks/use-auth';
import { Routes } from '@/config/routes';
import ProfileMenu from '@/components/header/profile-menu';
import { useModal } from '@/components/modals/context';
import { useIsMounted } from '@/hooks/use-is-mounted';
import Button from '@/components/ui/button';

const menuItems = [
  {
    id: 1,
    label: 'Home',
    path: Routes.public.home,
  },
  {
    id: 2,
    label: 'Explore',
    path: Routes.public.explore,
  },
  {
    id: 3,
    label: 'Pricing',
    path: Routes.public.pricing,
  },
  {
    id: 4,
    label: 'Help',
    path: Routes.public.help,
  },
];

export default function Menu() {
  const { openModal } = useModal();
  const { isAuthorized } = useAuth();
  const mounted = useIsMounted();

  return (
    <nav className="primary-nav hidden items-center justify-between md:flex">
      <ul className="hidden flex-wrap md:flex">
        {menuItems.map((item) => (
          <li key={item.id}>
            <Link href={item.path} className="px-5 capitalize text-white">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      {mounted ? (
        <>
          {isAuthorized ? (
            <div className="ml-7 flex justify-end">
              <ProfileMenu className="hidden md:block" />
            </div>
          ) : (
            <Button
              onClick={() => openModal('SIGN_IN')}
              className="ml-5 rounded-lg px-6 py-2 text-sm capitalize md:text-base 4xl:px-8 4xl:py-2.5"
            >
              Log in
            </Button>
          )}
        </>
      ) : null}
    </nav>
  );
}
