import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "Orda",
    template: "%s | Orda", 
  },
  description: "Shop the latest products on Orda — electronics, fashion, beauty and more.",
  keywords: ["shop", "ecommerce", "electronics", "fashion", "beauty"],
  openGraph: {
    siteName: "Orda",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
      <SessionProvider>

        <Navbar/>
        <Toaster/>
        {children}
        <Footer/>
      </SessionProvider>
        </body>
    </html>
  );
}
