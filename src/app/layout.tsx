import type { Metadata } from "next";
import "./globals.css";
import { NumberProvider } from "@/context/NumberContext";
import { PageNumberProvider } from "@/context/PageNumberContext";

export const metadata: Metadata = {
  title: "Keypad App",
  description: "Keypad input application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NumberProvider>
          <PageNumberProvider>
            {children}
          </PageNumberProvider>
        </NumberProvider>
      </body>
    </html>
  );
}
