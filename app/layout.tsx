import type { Metadata } from "next";
import { Red_Hat_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import ErrorBoundary from "./components/common/ErrorBoundary";

const redHatDisplay = Red_Hat_Display({
  variable: "--font-brand",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "H&S Revenue Intelligence Platform",
  description: "AI-powered revenue optimization and business intelligence",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${redHatDisplay.variable} ${jetBrainsMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <ErrorBoundary>
          <Providers>{children}</Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
