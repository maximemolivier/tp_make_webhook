import { Inter  } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: "Créateur de kébab",
  description: "Un chatbot pour créer un menu de kébab personnalisé",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={inter.className}>
      <body>
        {children}
      </body>
    </html>
  );
}
