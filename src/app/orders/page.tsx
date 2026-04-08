'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './orders.module.css';

type Order = {
  id: number;
  status: string;
  created: string;
  total?: number;
};

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setOrders(Array.isArray(data) ? data : data.orders ?? []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) return <p>Hleður pöntunum...</p>;

  return (
    <div className={styles.wrap}>
      <h1>Pantanir mínar</h1>

      {orders.length === 0 ? (
        <div className={styles.empty}>
          <p>Engar pantanir fundust.</p>
          <Link href="/menu" className={styles.btn}>Fara í matseðil</Link>
        </div>
      ) : (
        <div className={styles.list}>
          {orders.map((order) => (
            <Link href={`/orders/${order.id}`} key={order.id} className={styles.order}>
              <div>
                <span className={styles.id}>Pöntun #{order.id}</span>
                <span className={styles.date}>
                  {new Date(order.created).toLocaleDateString('is-IS')}
                </span>
              </div>
              <span className={styles.status}>{order.status}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}