import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./provider/providers";
import { fonts } from "./fonts";
import { ColorModeScript } from "@chakra-ui/react";
import { theme } from "./theme";
import Navbar from "./components/Navbar";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Chat reddit web app",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={fonts.inter.className}>
        <ColorModeScript
          type="cookie"
          initialColorMode={theme.initialColorMode}
        />
        <Providers>
          <Suspense>
            <Navbar />
          </Suspense>
          {children}
        </Providers>
      </body>
    </html>
  );
}
