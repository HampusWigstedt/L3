import type { Metadata } from "next";
import "./globals.css";
import NavBar from "../app/NavBar/NavBar";

export const metadata: Metadata = {
  title: "Converter",
  description: "Converter app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <NavBar />
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}
