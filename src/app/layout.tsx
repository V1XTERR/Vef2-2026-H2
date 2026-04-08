import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Ichiraku Viktor',
  description: 'Pantaðu mat á netinu',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="is">
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}