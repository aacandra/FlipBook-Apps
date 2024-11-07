import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { BookProvider } from "@/contexts/BookContext";
import Navbar from '@/components/navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PDF Reader',
  description: 'Modern PDF Ebook Reader',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <BookProvider>
            <Navbar />
            <main className="min-h-screen bg-background">
              {children}
            </main>
            <Toaster />
          </BookProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}