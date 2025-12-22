import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${momoTrustDisplay.className} min-h-dvh w-full antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* PAGE WRAPPER — THIS IS WHERE MARGINS BELONG */}
          <div className="mx-auto flex min-h-dvh w-full max-w-6xl flex-col px-5 py-6 md:px-10 md:py-10">
            <Header />

            {/* MAIN CONTENT SPACING */}
            <main className="my-8 flex-1">{children}</main>

            <Footer />
          </div>

          <ToasterWithTheme />
        </ThemeProvider>
      </body>
    </html>
  );
}
