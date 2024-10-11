import type { Metadata } from "next";
import "./globals.css";
import Layout from "./_common/layout";
import { SectorDataProvider } from "../context/apiContext";


export const metadata: Metadata = {
  title: "Spark Web Solutions",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SectorDataProvider>
          <Layout>{children}</Layout>
        </SectorDataProvider>
      </body>
    </html>
  );
}

