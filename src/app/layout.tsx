import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Harsh V Singh - Brand Strategist & Project Director",
  description: "Harsh V Singh is Associate Director of Project Delivery at Rang Digitech. Former journalist turned brand strategist.",
  openGraph: {
    title: "Harsh V Singh - Brand Strategist & Project Director",
    description: "Harsh V Singh is Associate Director of Project Delivery at Rang Digitech.",
    url: "https://harshvsingh.com",
    siteName: "Harsh V Singh",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="site">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
