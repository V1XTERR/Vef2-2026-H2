import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.hero}>
      <div className={styles.text}>
        <h1>Velkomin í Veitingastaðinn</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Við bjóðum upp á ferskt og ljúffengt mat, útbúið með ást og umhyggju 
          fyrir góðan mat og gestina okkar.
        </p>
        <Link href="/menu" className={styles.btn}>Skoða matseðil</Link>
      </div>
      <div className={styles.imgWrap}>
        <Image
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80"
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