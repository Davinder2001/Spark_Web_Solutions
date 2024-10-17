'use client';
import { useContext } from 'react';
import Image from 'next/image';
import { SectorDataContext } from '@/context/apiContext';
const FirstSection = () => {
    const pagesDataApi = useContext(SectorDataContext);
    const mainData = pagesDataApi?.pagesDataApi?.find(page => page.slug === 'internship')?.acf?.first_section;
   
  return (
    <div className='container'>
        <h2>{mainData?.programe}</h2>
        <h2>{mainData?.programe_name}</h2>
        <div className=''>
            <p>{mainData?.description}</p>
            <Image src={mainData?.image} alt='img'
                    layout="responsive" 
                    width={100} 
                    height={50} 
                    style={{ width: '100%', height: 'auto' }} 
            />
        </div>
    </div>
  )
}

export default FirstSection