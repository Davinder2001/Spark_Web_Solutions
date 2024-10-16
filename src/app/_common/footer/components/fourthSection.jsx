"use client";
import { useContext } from 'react';
import { SectorDataContext } from '@/context/apiContext';
const FourthSection = () => {
    const { footerDataApi } = useContext(SectorDataContext);
    const mainData = footerDataApi?.find(page => page.slug === 'footer')?.acf?.logo
  return (
    <div>
        <img src={mainData} alt='img'/>
    </div>
  )
}

export default FourthSection