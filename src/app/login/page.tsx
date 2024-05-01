'use client';

import { Button } from '@carbon/react';
import { useSearchParams } from 'next/navigation';
import styles from './pages.module.scss';

export default function LoginPage() {
  const searchParams = useSearchParams();

  function login() {
    const origURL = searchParams.get('orig_url');
    const loginURL = new URL('/api/auth/login', window.location.origin);
    if (origURL) loginURL.searchParams.set('orig_url', origURL);
    return (window.location.href = loginURL.toString());
  }

  return (
    <div style={{ height: '100vh' }}>
      <div className={styles.title}>
        <h1>
          Welcome to <b>VEST</b>
        </h1>
      </div>

      <div className={styles.fold}>
        <Button onClick={() => login()}>Login</Button>
      </div>
    </div>
  );
}
