import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "elivapp Admin Dashboard",
  description: "elivapp Admin Console - Share the good. Earn more.",
  icons: {
    icon: [
      { url: "/brand-logo.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/brand-logo.png",
    apple: "/brand-logo.png",
  },
  openGraph: {
    title: "elivapp Admin Dashboard",
    description: "elivapp Admin Console - Share the good. Earn more.",
    siteName: "elivapp Admin Console",
    images: [
      {
        url: "/brand-logo.png",
        width: 600,
        height: 600,
        alt: "elivapp Logo",
      },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
