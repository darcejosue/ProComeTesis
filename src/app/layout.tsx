import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";


export const metadata: Metadata = {
  title: "ProCome",
  description: "Sistema Web de Informacion sobre el comedor DElicias La Tia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
