import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { siteMetadata } from "../lib/siteMetadata";
import { Navbar } from "@/components/nav/Navbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "500", "600", "800"],
});

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <main>
          <Navbar />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
