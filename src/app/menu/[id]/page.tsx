'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import styles from './item.module.css';
import { notFound } from 'next/navigation';

type MenuItem = {
  id: number;
  title: string;
  price: number;
  description: string;
  category?: string;
  image?: string;
};

async function getItem(id: string): Promise<MenuItem | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default function MenuItemPage() {
  const params = useParams();
  const id = params.id as string;
  const [item, setItem] = useState<MenuItem | null>(null);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    getItem(id).then((data) => setItem(data));
  }, [id]);

  async function handleAddToCart() {
    if (!item) return;
    setAdding(true);

    try {
      let cartId = localStorage.getItem('cartId');

      if (!cartId) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({}),
        });
        const data = await res.json();
        cartId = data.id;
        localStorage.setItem('cartId', cartId!);
      }

      // Bæta vöru í körfu
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/${cartId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: item.id, quantity: 1 }),
      });

      setAdded(true);
      setTimeout(() => setAdded(false), 8000);
    } finally {
      setAdding(false);
    }
  }

  if (!item) return <p>Hleður...</p>;

  return (
    <div className={styles.wrap}>
      <Link href="/menu" className={styles.back}>Til baka í matseðil</Link>
      {item.image && (
        <img src={item.image} alt={item.title} className={styles.image} />
      )}
      <h1 className={styles.heading}>{item.title}</h1>
      {item.category && <p className={styles.category}>{item.category}</p>}
      <p className={styles.desc}>{item.description}</p>
      <p className={styles.price}>{item.price} kr.</p>
      <button onClick={handleAddToCart} disabled={adding} className={styles.btn}>
        {added ? 'Bætt í körfu!' : adding ? 'Bætir við...' : 'Bæta í körfu'}
      </button>
      {added && (
        <Link href="/cart" className={styles.cartLink}>Fara í körfu</Link>
      )}
    </div>
  );
}