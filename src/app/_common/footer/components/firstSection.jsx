"use client";
import { useContext } from 'react';
import { SectorDataContext } from '@/context/apiContext';
import Link from 'next/link';

const FirstSection = () => {

    const { footerDataApi } = useContext(SectorDataContext);
    const mainData = footerDataApi?.find(page => page.slug === 'footer')?.acf?.address
    
  return (
    <div className='section'>
        <h2>{mainData?.heading}</h2>
        <p>{mainData?.address}</p>
        {/* <Link href={mainData?.link}>Open Map</Link> */}
        <Link href='/'>Open Map</Link>
    </div>
  )
}

export default FirstSection