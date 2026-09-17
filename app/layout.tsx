import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CartProvider } from "@/lib/cart-context";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Heiness Foods — Good food, delivered fast",
  description:
    "Order freshly prepared Nigerian meals from Heiness Foods and pay with OPay. Portfolio demo project.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-white font-sans text-ink antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
