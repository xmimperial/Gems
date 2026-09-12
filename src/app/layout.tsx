import type { Metadata } from "next";
import { Bodoni_Moda, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const serifDisplay = Bodoni_Moda({
  variable: "--font-serif-display",
  subsets: ["latin"],
  weight: ["500", "600"],
});

const grotesque = Inter({
  variable: "--font-grotesque",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Imperial Star Gems — Loose Natural & Lab-Grown Diamonds",
    template: "%s — Imperial Star Gems",
  },
  description:
    "Imperial Star Gems sources and grades loose natural and lab-grown diamonds across all standard shapes, sold directly on specification.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${serifDisplay.variable} ${grotesque.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <SiteHeader />
        <main className="flex flex-1 flex-col">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
