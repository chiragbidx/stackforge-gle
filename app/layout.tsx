// Root server layout: applies global styles and mounts client-only ErrorReporter.
import type { Metadata } from "next";
import "./globals.css";
import ErrorReporter from "../components/ErrorReporter";

export const metadata: Metadata = {
  title: "Joblyft – Remote Jobs Board",
  description: "Find and post remote jobs at Joblyft. Built with Next.js, Drizzle ORM, and TailwindCSS.",
  openGraph: {
    title: "Joblyft – Remote Jobs Board",
    description: "Discover and share the latest remote career opportunities with Joblyft.",
    type: "website",
    url: "https://joblyft.com",
    images: [],
  },
  metadataBase: new URL("https://joblyft.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <ErrorReporter />
        {children}
      </body>
    </html>
  );
}