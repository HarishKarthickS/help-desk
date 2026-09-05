import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "help-desk — departures",
  description: "Airport FIDS board for support tickets, queues, and comments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
