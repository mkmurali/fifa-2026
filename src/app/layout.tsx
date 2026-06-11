import type { Metadata } from "next";
import "leaflet/dist/leaflet.css";
import "./globals.css";
import { KalshiOddsProvider } from "@/lib/KalshiOddsProvider";

export const metadata: Metadata = {
  title: "FIFA World Cup 2026 Schedule",
  description: "Interactive visualization of the 2026 FIFA World Cup with match schedules, venues, and knockout bracket.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full">
        <KalshiOddsProvider>{children}</KalshiOddsProvider>
      </body>
    </html>
  );
}
