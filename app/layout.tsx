import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";

const headingFont = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const bodyFont = Open_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Word of Life Christian Academy | Springfield Preschool-8th Grade",
  description:
    "A Christ-centered education in Springfield with small class sizes, strong academics, STEM, fine arts, athletics, and a safe nurturing environment from Preschool through 8th Grade.",
  keywords: [
    "Word of Life Christian Academy",
    "Springfield Christian school",
    "Preschool through 8th grade",
    "Christ-centered education",
    "STEM Christian academy",
    "private school Springfield",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
