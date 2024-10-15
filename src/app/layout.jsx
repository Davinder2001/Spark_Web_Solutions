import "./globals.css";
import "./style/global.scss";
import Layout from "./_common/layout";
import { SectorDataProvider } from "../context/apiContext";

export default function RootLayout({ children }) {
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
