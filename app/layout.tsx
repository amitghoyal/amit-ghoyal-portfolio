import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Amit Ghoyal | Software Developer",
    template: "%s | Amit Ghoyal",
  },
  description:
    "Full-Stack Developer specializing in React, Next.js, Python, FastAPI, Machine Learning, and scalable web applications.",
  keywords: [
    "Amit Ghoyal",
    "Software Developer",
    "Full Stack Developer",
    "React",
    "Next.js",
    "Python",
    "Machine Learning",
    "Portfolio",
  ],
  icons: {
    icon: "/profile.png",        
    apple: "/profile.png",       // for iOS home screen
    shortcut: "/profile.png",    // legacy browsers
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}