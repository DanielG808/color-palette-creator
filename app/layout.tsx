import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

export const metadata: Metadata = {
  title: "Color Palette Creator",
  description:
    "A randomizer to help get started with an application color palette.",
};

const momoTrustDisplay = localFont({
  src: "./fonts/MomoTrustDisplay-Regular.ttf",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${momoTrustDisplay.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
