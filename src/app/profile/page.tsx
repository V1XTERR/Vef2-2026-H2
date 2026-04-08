'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './profile.module.css';

type User = {
  id: number;
  username: string;
  email?: string;
  admin: boolean;
};

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) {
          localStorage.removeItem('token');
          router.push('/login');
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) setUser(data);
      })
      .catch(() => setError('Gat ekki sótt notandaupplýsingar'))
      .finally(() => setLoading(false));
  }, [router]);

  function handleLogout() {
    localStorage.removeItem('token');
    router.push('/');
  }

  if (loading) return <p>Hleður...</p>;
  if (error) return <p>{error}</p>;
  if (!user) return null;

  return (
    <div className={styles.wrap}>
      <h1>Prófíll</h1>
      <div className={styles.card}>
        <p><span>Notandanafn</span>{user.username}</p>
        {user.email && <p><span>Netfang</span>{user.email}</p>}
        <p><span>Stjórnandi</span>{user.admin ? 'Já' : 'Nei'}</p>
      </div>
      <button onClick={handleLogout} className={styles.logout}>
        Skrá út
      </button>
    </div>
  );
}