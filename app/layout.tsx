import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import Script from "next/script";
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
  icons: {
    icon: [
      {
        url: "/images/cropped-favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/images/cropped-favicon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    apple: {
      url: "/images/cropped-favicon-180x180.webp",
      sizes: "180x180",
      type: "image/webp",
    },
  },
  other: {
    "msapplication-TileImage": "/images/cropped-favicon-270x270.png",
  },
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
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1097838482231162');
fbq('track', 'PageView');`}
        </Script>
        <noscript>
          <img
            height={1}
            width={1}
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1097838482231162&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}
