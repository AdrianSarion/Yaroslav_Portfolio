import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yaroslav - Full-Stack Developer",
  description: "Portfolio website of Yaroslav, a Senior Full-Stack Developer specializing in modern web technologies.",
  keywords: ["developer", "portfolio", "full-stack", "MERN", "Vue", "Laravel", "Python"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
