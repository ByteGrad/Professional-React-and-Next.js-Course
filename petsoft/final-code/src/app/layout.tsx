import type { Metadata } from "next";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";


export const metadata: Metadata = {
  title: "PetSoft - Pet daycare software",
  description: "Take care of people's pets responsibly with PetSoft.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-sans text-sm min-h-screen text-zinc-900 bg-[#E5E8EC]`}
      >
        <SessionProvider> {children}</SessionProvider>
      </body>
    </html>
  );
}
