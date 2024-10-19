import type { Metadata } from "next";
import "./globals.css";

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
      <body>
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}
