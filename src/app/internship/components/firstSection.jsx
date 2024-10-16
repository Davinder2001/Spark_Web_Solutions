'use client';
import { useContext } from 'react';
import { SectorDataContext } from '@/context/apiContext';
const FirstSection = () => {
    const pagesDataApi = useContext(SectorDataContext);
    const mainData = pagesDataApi?.pagesDataApi?.find(page => page.slug === 'internship')?.acf?.first_section;
   
  return (
    <div>
        <h2>{mainData?.programe}</h2>
        <h2>{mainData?.programe_name}</h2>
        <div className=''>
            <p>{mainData?.description}</p>
            <img src={mainData?.image} alt='img'/>
        </div>
    </div>
  )
}

export default FirstSection