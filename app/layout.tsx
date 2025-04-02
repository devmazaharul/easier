import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import { Toaster } from 'react-hot-toast';

const primary_font = Space_Grotesk({
  weight: '400',
  style: ['normal'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Easiyer',
  description: 'Developed by mazaharul islam',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${primary_font.className} antialiased`}>
        <div className="w-full">
          <Header />
          {children}
          <Toaster position='bottom-right'/>
        </div>
      </body>
    </html>
  );
}
