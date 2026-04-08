import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.hero}>
      <div className={styles.text}>
        <h1>Ichiraku Viktor</h1>
        <p>
          Velkomin í Ichiraku Viktor — þar sem góður matur og geggjuð stemning
          fara saman. Við bjóðum upp á skemmtilegar máltíðir með ferskum
          hráefnum. Komdu og upplifðu muninn.
        </p>
        <Link href="/menu" className={styles.btn}>Skoða matseðil</Link>
      </div>
      <div className={styles.imgWrap}>
        <Image
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
          alt="Matur"
          width={600}
          height={400}
          style={{ borderRadius: '12px', objectFit: 'cover', width: '100%', height: 'auto' }}
          priority
        />
      </div>
    </div>
  );
}