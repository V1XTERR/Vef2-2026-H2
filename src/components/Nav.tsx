'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Nav.module.css';

const links = [
  { href: '/', label: 'Forsíða' },
  { href: '/menu', label: 'Matseðill' },
  { href: '/login', label: 'Innskráning' },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>Ichiraku Ramen</Link>
        <ul className={styles.links}>
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className={pathname === href ? styles.active : ''}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}