import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Help desk",
  description: "Support tickets, status filters, and a conversation pane.",
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
