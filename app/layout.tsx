import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { ThemeProvider } from "@/contexts/theme-provider";
import ToasterWithTheme from "@/components/toaster-with-theme";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${momoTrustDisplay.className} flex flex-col items-center min-h-screen p-10 antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />
          <ToasterWithTheme />
        </ThemeProvider>
      </body>
    </html>
  );
}
