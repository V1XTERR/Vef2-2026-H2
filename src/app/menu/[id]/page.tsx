import Link from 'next/link';
import styles from './item.module.css';
import { notFound } from 'next/navigation';

type MenuItem = {
  id: number;
  name: string;
  price: number;
  description: string;
  category_id: number;
  image?: string;
};

const API = process.env.NEXT_PUBLIC_API_URL;

async function getItem(id: string): Promise<MenuItem | null> {
  try {
    const res = await fetch(`${API}/menu/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function MenuItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getItem(id);

  if (!item) notFound();

  return (
    <div className={styles.wrap}>
      <Link href="/menu" className={styles.back}>← Til baka í matseðil</Link>
      {item.image && (
        <img src={item.image} alt={item.name} className={styles.image} />
      )}
      <h1 className={styles.heading}>{item.name}</h1>
      <p className={styles.desc}>{item.description}</p>
      <p className={styles.price}>{item.price} kr.</p>
      <button className={styles.btn}>Bæta í körfu</button>
    </div>
  );
}