import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import SideNav from '@/components/SideNav';
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className={inter.className}>
        <Providers>
          <div className="flex h-full">
            <SideNav />
            <div className="container width-3/4 pl-12 pr-12 pt-6">
              <Suspense fallback={<h6 className='text-center ltr'>📡 Loading data please wait ... </h6>}>
                {children}
              </Suspense>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
