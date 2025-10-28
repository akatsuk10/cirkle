import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SolanaWalletProvider } from "@/lib/SolanaProvider";
import { Toaster } from "@/components/ui/sonner";

const helvetica = localFont({
  src: [
    {
      path: "./fonts/helvetica-light-587ebe5a59211.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/helvetica.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/helvetica-oblique.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/helvetica-bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Helvetica-BoldOblique.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-helvetica",
});

export const metadata: Metadata = {
  title: "Cirkle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${helvetica.variable} antialiased font-helvetica`}
      >
        <SolanaWalletProvider>
          {children}
        </SolanaWalletProvider>
        <Toaster />
      </body>
    </html>
  );
}
