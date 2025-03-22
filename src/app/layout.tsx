import type { Metadata } from "next";
import { Inter, Calistoga } from "next/font/google"; // fonts import from built in nest fonts
import "./globals.css";
import { twMerge } from "tailwind-merge";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" }); // inter font registration and variable name
const calistoga = Calistoga({ subsets: ["latin"], variable: "--font-serif", weight: ["400"] }); // calistoga font registration and variable name

export const metadata: Metadata = {
  title: "Dhrumil Trada Portfolio",
  description: "Made with ❤️ by Dhrumil Trada",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* twMerge = tailwind merge classes function to add fonts from google fonts */}
      {/* antialiased for antialiasing the fonts for all browsers */}
      <body className={
          twMerge(inter.variable, calistoga.variable, "bg-gray-900 text-white antialiased font-sans")
        }>{children}</body>
    </html>
  );
}
