import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "help-desk — queue",
  description: "Spare ops console for support tickets, queues, and comments.",
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
