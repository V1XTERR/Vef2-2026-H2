import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

// Forsíða með kyrrstæðum gögnum
export default function Home() {
  return (
    <div className={styles.hero}>
      <div className={styles.text}>
        <h1>Ichiraku Ramen</h1>
        <p>
          Við eldum ramen með ástríðu og hefð. Hvert skál er útbúin með fersku
          soði, handgerðum núðlum og vandlega völdum hráefnum. Velkomin.
        </p>
        <Link href="/menu" className={styles.btn}>Skoða matseðil</Link>
      </div>
      <div className={styles.imgWrap}>
        <Image
          src="https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&q=80"
          alt="Ramen skál"
          width={600}
          height={400}
          style={{ borderRadius: '12px', objectFit: 'cover', width: '100%', height: 'auto' }}
          priority
        />
      </div>
    </div>
  );
}