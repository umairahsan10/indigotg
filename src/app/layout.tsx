import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { orbitron } from "./fonts";
import "./globals.css";
import Navigation from "./components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "IndigoTG",
  description: "IndigoTG - Your trusted technology partner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} antialiased`}
      >
        <Navigation />
        <main id="page-content">
          {children}
        </main>
      </body>
    </html>
  );
}
