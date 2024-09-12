import { AuthSessionProvider } from "@/utils/providers"
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Admin",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AuthSessionProvider>{children}</AuthSessionProvider>
      </body>
    </html>
  );
}
