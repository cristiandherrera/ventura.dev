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
  title: "Cristian Herrera | Ventura Web Design & Development | ventura.dev",
  description: "Professional web design and development services in Ventura County. Fast, secure websites built by Cristian Herrera to help local businesses grow online.",
  keywords: "Ventura web design, Ventura developer, Ventura.dev, Cristian Herrera, website development, web solutions, Ventura County web designer, local web developer",
  authors: [{ name: "Cristian Herrera" }],
  creator: "Cristian Herrera",
  publisher: "ventura.dev",
  robots: "index, follow",
  alternates: {
    canonical: "https://ventura.dev",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ventura.dev",
    title: "Cristian Herrera | Ventura Web Design & Development",
    description: "Professional web design and development services in Ventura County. Fast, secure websites built by Cristian Herrera.",
    siteName: "ventura.dev",
    images: [
      {
        url: "/imgs/me.jpg",
        width: 1200,
        height: 630,
        alt: "Cristian Herrera - Ventura Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cristian Herrera | Ventura Web Design & Development",
    description: "Professional web design and development services in Ventura County. Fast, secure websites built by Cristian Herrera.",
    images: ["/imgs/me.jpg"],
    creator: "@cristianherrera",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://ventura.dev" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
