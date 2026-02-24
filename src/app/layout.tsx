import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/lib/query-client";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Arzi Anime List",
  description: "Discover and explore anime with Jikan API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <QueryProvider>
          <ThemeProvider>
            <Navbar />
            <div className="min-h-[calc(100vh-(154px+65px))]">
              {children}
            </div>

            <Footer />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
