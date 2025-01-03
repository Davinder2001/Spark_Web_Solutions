'use client'
import React, { useContext, useState, useEffect } from 'react';
import { SectorDataContext } from '@/context/apiContext';
import Footer from './footer/footer';
import Header from './header/header';
import Loader from '@/app/_common/loader/loader';

const Layout = ({ children }) => {
  const { headerDataApi } = useContext(SectorDataContext);
  const mainData = headerDataApi?.find(page => page.slug === 'header')?.acf;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let timeout;

    if (mainData) {
      setIsLoading(false);
    } else {
      // Set a timeout to refresh the page after 5 seconds if data is not available
      timeout = setTimeout(() => {
        window.location.reload();
      }, 5000);
    }

    return () => {
      if (timeout) clearTimeout(timeout); // Clear timeout on component unmount
    };
  }, [mainData]);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <Header />
          <main>{children}</main>
          <Footer />
        </>
      )}
    </>
  );
};

export default Layout;
