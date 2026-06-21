import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Buy Car Tyres Online | Mobile Tyre Fitting Near You | Matrix Mobile Tyres',
  description: 'Mobile tyre fitting service in Coventry and surrounding areas. 7 days a week, 8am–8pm. Same-day fitting on selected tyres.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="bg-gray-900 text-gray-400 text-sm py-8 px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Matrix Mobile Tyres. All rights reserved.</p>
          <p className="mt-1">Serving Coventry, Warwick, Leamington Spa, Rugby, Nuneaton, Bedworth &amp; Hinckley</p>
        </footer>
      </body>
    </html>
  );
}
