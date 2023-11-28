import React from 'react';
import Head from 'next/head';
import SignIn from 'containers/Auth/SignIn/SignIn';

export default function signInPage() {
  return (
    <>
      <Head>
        <title>Sign In | TripFinder.</title>
      </Head>
      <SignIn />
    </>
  );
}
