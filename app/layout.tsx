import type { Metadata } from 'next';
import { GameProvider } from '@/context/GameContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'La boîte à jeux by LaFlūte',
  description: 'Le jeu des 5 secondes - Version futuriste',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <GameProvider>{children}</GameProvider>
      </body>
    </html>
  );
}
