import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CINE MATRIX - Movies Dashboard",
  description: "Explora películas con tecnología futurista usando The Movie Database",
  keywords: "películas, cine, TMDB, movie database, entretenimiento, futurista, cyber",
  authors: [{ name: "CINE MATRIX" }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#a855f7' },
    { media: '(prefers-color-scheme: dark)', color: '#c084fc' }
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 animate-fade-in">
              {children}
            </main>
            
            {/* Background decoration */}
            <div className="fixed inset-0 -z-10 h-full w-full bg-background">
              <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,hsl(var(--muted))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted))_1px,transparent_1px)] bg-[size:6rem_4rem] opacity-20"></div>
              <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary opacity-20 blur-[100px]"></div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
