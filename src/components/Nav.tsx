'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './Nav.module.css';

export default function Nav() {
  const pathname = usePathname();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem('token'));
  }, [pathname]);

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>Ichiraku Viktor</Link>
        <ul className={styles.links}>
          <li>
            <Link href="/" className={pathname === '/' ? styles.active : ''}>
              Forsíða
            </Link>
          </li>
          <li>
            <Link href="/menu" className={pathname === '/menu' ? styles.active : ''}>
              Matseðill
            </Link>
          </li>
          <li>
            <Link href={loggedIn ? '/profile' : '/login'} className={pathname === '/profile' || pathname === '/login' ? styles.active : ''}>
              {loggedIn ? 'Prófíll' : 'Innskráning'}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}