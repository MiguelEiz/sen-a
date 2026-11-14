import { Nunito } from 'next/font/google';
import './globals.css';

// 1. Cargamos Nunito (versión variable)
const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 2. Inyectamos la variable en la etiqueta html
    <html lang="es" className={`${nunito.variable}`}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}