import React, { ReactNode } from 'react';

import Footer from './footer/footer';
import Header from './header/header';

interface LayoutProps {
  children: ReactNode;  // Define children type as ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
     <Header/>
      <main>{children}</main> {/* Add children inside main content area */}
      <Footer />
    </>
  );
};

export default Layout;
