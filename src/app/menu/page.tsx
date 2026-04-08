import Link from 'next/link';
import styles from './menu.module.css';

type MenuItem = {
  id: number;
  title: string;
  price: number;
  description: string;
  category?: string;
  image?: string;
};

const API = process.env.NEXT_PUBLIC_API_URL;

async function getMenu(page: number): Promise<MenuItem[]> {
  const limit = 9;
  const offset = (page - 1) * limit;
  try {
    const res = await fetch(`${API}/menu?limit=${limit}&offset=${offset}`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function MenuPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const items = await getMenu(page);

  return (
    <div>
      <h1 className={styles.title}>Matseðill</h1>
      {items.length === 0 ? (
        <p className={styles.empty}>Engar vörur fundust.</p>
      ) : (
        <div className={styles.grid}>
          {items.map((item) => (
            <Link href={`/menu/${item.id}`} key={item.id} className={styles.card}>
              <div className={styles.cardBody}>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                {item.category && (
                  <span className={styles.category}>{item.category}</span>
                )}
              </div>
              <div className={styles.price}>{item.price} kr.</div>
            </Link>
          ))}
        </div>
      )}
      <div className={styles.pagination}>
        {page > 1 && (
          <Link href={`/menu?page=${page - 1}`} className={styles.pageBtn}>Fyrri</Link>
        )}
        {items.length === 9 && (
          <Link href={`/menu?page=${page + 1}`} className={styles.pageBtn}>Næsta</Link>
        )}
      </div>
    </div>
  );
}