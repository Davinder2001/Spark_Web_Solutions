"use client";
import { useContext } from 'react';
import Image from 'next/image';
import { SectorDataContext } from '@/context/apiContext';

const FourthSection = () => {
    const { footerDataApi } = useContext(SectorDataContext);
    const mainData = footerDataApi?.find(page => page.slug === 'footer')?.acf?.logo;

    return (
        <div className='section'>
            <Image
                src={mainData}
                alt='Logo'
                width={100} 
                height={100}
                className='logo-image'
            />
        </div>
    );
}

export default FourthSection;
