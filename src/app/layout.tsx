import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AutumnProvider } from "autumn-js/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js Autumn App",
  description: "Starter Next.js app with Autumn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-stone-50`}
      >
        <Toaster position="top-right" />
        <AutumnProvider
          customerId={"user_123"}
          customerData={{ name: "John Doe" }}
        >
          {children}
        </AutumnProvider>
      </body>
    </html>
  );
}
