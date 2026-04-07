import Link from 'next/link';
import styles from './menu.module.css';

type MenuItem = {
  id: number;
  name: string;
  price: number;
  description: string;
  category_id: number;
};

type MenuResponse = {
  data: MenuItem[];
  total: number;
  limit: number;
  offset: number;
};

const API = process.env.NEXT_PUBLIC_API_URL;

async function getMenu(page: number): Promise<MenuResponse> {
  const limit = 9;
  const offset = (page - 1) * limit;
  try {
    const res = await fetch(`${API}/menu?limit=${limit}&offset=${offset}`, {
      cache: 'no-store',
    });
    if (!res.ok) return { data: [], total: 0, limit, offset };
    return res.json();
  } catch {
    return { data: [], total: 0, limit, offset };
  }
}

export default async function MenuPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const { data: items, total } = await getMenu(page);
  const totalPages = Math.ceil(total / 9);

  return (
    <div>
      <h1 className={styles.title}>Matseðill</h1>

      {items.length === 0 ? (
        <p className={styles.empty}>Engar vörur fundust. Kveiktu á bakenda!</p>
      ) : (
        <div className={styles.grid}>
          {items.map((item) => (
            <Link href={`/menu/${item.id}`} key={item.id} className={styles.card}>
              <div className={styles.cardBody}>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
              </div>
              <div className={styles.price}>{item.price} kr.</div>
            </Link>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className={styles.pagination}>
          {page > 1 && (
            <Link href={`/menu?page=${page - 1}`} className={styles.pageBtn}>
              ← Fyrri
            </Link>
          )}
          <span>Síða {page} af {totalPages}</span>
          {page < totalPages && (
            <Link href={`/menu?page=${page + 1}`} className={styles.pageBtn}>
              Næsta →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}