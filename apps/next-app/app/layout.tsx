import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import Image from 'next/image'; 

export const metadata: Metadata = {
  title: 'NIRD Quest | Communaute libre, inclusive et durable',
  description:
    "Plateforme gamifiee pour faire grandir la communaute NIRD : quetes, missions, XP, ressources sur l'inclusion, la responsabilite et la durabilite.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='fr'>
      <body>
        <header className='header'>
          <div className='brand'>
            <div className='brand-mark'>
              <Image
                src="/logo.png"
                alt="Logo NIRD Quest"
                fill                 
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div>
              <div style={{ fontWeight: 700 }}>NIRD Quest</div>
              <div style={{ color: 'var(--muted)', fontSize: 13 }}>
                Numerique Inclusif, Responsable, Durable
              </div>
            </div>
          </div>
          <nav>
            <Link href='/'>Accueil</Link>
            <Link href='/quests'>Quêtes</Link>
            <Link href='/missions'>Missions</Link>
            <Link href='/learn'>Explications</Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer className='footer'>
          NIRD Quest - &copy; 2025 - EPInard
          <Link href='/hidden-snake' className='easter-egg'>.</Link>
        </footer>
      </body>
    </html>
  );
}
