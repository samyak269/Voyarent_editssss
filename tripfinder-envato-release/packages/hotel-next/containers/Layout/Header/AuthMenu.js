import React from 'react';
import Link from 'next/link';
import { LOGIN_PAGE, REGISTRATION_PAGE } from 'settings/constant';

export default function AuthMenu({ className }) {
  return (
    <ul className={className}>
      <li>
        <Link href={LOGIN_PAGE}>
          <a>Sign in</a>
        </Link>
      </li>
      <li>
        <Link href={REGISTRATION_PAGE}>
          <a>Sign up</a>
        </Link>
      </li>
    </ul>
  );
}
