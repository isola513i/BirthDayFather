import type { Metadata, Viewport } from "next";
import { Mali } from "next/font/google";
import "./globals.css";

const mali = Mali({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "thai"],
  variable: "--font-mali",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://happy-birth-day-por-nui.vercel.app"),
  title: "Happy Birthday พ่อนุ้ย",
  description: "ของขวัญวันเกิดพ่อนุ้ย สุดยอดเลยนะ",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎂</text></svg>",
  },
  openGraph: {
    title: "Happy Birthday พ่อนุ้ย",
    description: "ของขวัญวันเกิดพ่อนุ้ย สุดยอดเลยนะ",
    images: [
      {
        url: "/photos/photo4.jpg",
        width: 1200,
        height: 630,
        alt: "Birthday Surprise for Dad",
      },
    ],
    type: "website",
    locale: "th_TH",
  },
  twitter: {
    card: "summary_large_image",
    title: "Happy Birthday พ่อนุ้ย",
    description: "ของขวัญวันเกิดพ่อนุ้ย สุดยอดเลยนะ",
    images: ["/photos/photo4.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={`${mali.variable} font-mali antialiased bg-white`}>
        {children}
      </body>
    </html>
  );
}
