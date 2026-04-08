'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './cart.module.css';

type CartLine = {
  id: number;
  quantity: number;
  product_id: number;
  product_title: string;
  product_price: number;
};

type Cart = {
  id: string;
  lines: CartLine[];
};

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [ordering, setOrdering] = useState(false);

  useEffect(() => {
    const cartId = localStorage.getItem('cartId');
    if (!cartId) {
      setLoading(false);
      return;
    }

    // Sækir körfu frá bakenda
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/${cartId}`)
      .then((res) => res.json())
      .then((data) => setCart(data))
      .catch(() => setCart(null))
      .finally(() => setLoading(false));
  }, []);

  async function handleOrder() {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const cartId = localStorage.getItem('cartId');
    if (!cartId) return;

    setOrdering(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cartId }),
      });

      if (res.ok) {
        localStorage.removeItem('cartId');
        router.push('/orders');
      }
    } finally {
      setOrdering(false);
    }
  }

  if (loading) return <p>Hleður körfu...</p>;

  if (!cart || cart.lines.length === 0) {
    return (
      <div className={styles.empty}>
        <h1>Karfan þín</h1>
        <p>Karfan er tóm.</p>
        <Link href="/menu" className={styles.btn}>Fara í matseðil</Link>
      </div>
    );
  }

  const total = cart.lines.reduce(
    (sum, line) => sum + line.product_price * line.quantity,
    0
  );

  return (
    <div className={styles.wrap}>
      <h1>Karfan þín</h1>
      <div className={styles.lines}>
        {cart.lines.map((line) => (
          <div key={line.id} className={styles.line}>
            <span>{line.product_title}</span>
            <span>{line.quantity} stk.</span>
            <span>{line.product_price * line.quantity} kr.</span>
          </div>
        ))}
      </div>
      <div className={styles.total}>Samtals: {total} kr.</div>
      <button onClick={handleOrder} disabled={ordering} className={styles.btn}>
        {ordering ? 'Pantar...' : 'Panta'}
      </button>
    </div>
  );
}