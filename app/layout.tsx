import type { Metadata, Viewport } from "next";
import { Mali } from "next/font/google";
import "./globals.css";

const mali = Mali({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "thai"],
  variable: "--font-mali",
});

export const metadata: Metadata = {
  title: "Happy Birthday Dad! 🎂",
  description:
    "ของขวัญวันเกิดพิเศษสำหรับพ่อ... แตะเพื่อเปิดดูความทรงจำของเรา ❤️",
  openGraph: {
    title: "Happy Birthday Dad! 🎂",
    description:
      "ของขวัญวันเกิดพิเศษสำหรับพ่อ... แตะเพื่อเปิดดูความทรงจำของเรา ❤️",
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
    title: "Happy Birthday Dad! 🎂",
    description:
      "ของขวัญวันเกิดพิเศษสำหรับพ่อ... แตะเพื่อเปิดดูความทรงจำของเรา ❤️",
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
