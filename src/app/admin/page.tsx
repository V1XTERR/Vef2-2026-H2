'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './admin.module.css';

export default function AdminPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [productId, setProductId] = useState('');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    // Athuga hvort notandi sé admin
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.admin) {
          router.push('/');
        } else {
          setIsAdmin(true);
        }
      });
  }, [router]);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !productId) return;

    setUploading(true);
    setMessage('');

    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/menu/${productId}`,
        {
          method: 'PATCH',
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      if (res.ok) {
        setMessage('Mynd sett inn!');
        setFile(null);
        setProductId('');
      } else {
        setMessage('Villa við að setja inn mynd');
      }
    } catch {
      setMessage('Villa kom upp');
    } finally {
      setUploading(false);
    }
  }

  if (!isAdmin) return <p>Hleður...</p>;

  return (
    <div className={styles.wrap}>
      <h1>Stjórnborð</h1>
      <h2>Setja inn mynd á vöru</h2>
      <form onSubmit={handleUpload} className={styles.form}>
        {message && <p className={styles.message}>{message}</p>}
        <label>
          Auðkenni vöru
          <input
            type="number"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            placeholder="t.d. 1"
            required
          />
        </label>
        <label>
          Mynd
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            required
          />
        </label>
        <button type="submit" disabled={uploading}>
          {uploading ? 'Hleður upp...' : 'Hlaða upp mynd'}
        </button>
      </form>
    </div>
  );
}