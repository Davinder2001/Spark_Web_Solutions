'use client';
import { useContext } from 'react';
import { SectorDataContext } from '@/context/apiContext';

const AboutUsSection = () => {

    const { pagesDataApi } = useContext(SectorDataContext);
    const mainData = pagesDataApi?.find(page => page.slug === 'home')?.acf.about_us_section;
    
  return (
    <div className='container'>
    <h2>{mainData?.heading}</h2>
           {mainData?.image_gallery?.map((image, index) => (
          <div key={index} className="about-card">
            <img src={image.images} alt={image.card_heading} />
          </div>
        ))}
            <p>{mainData?.main_description}</p>
            <p>{mainData?.small_description}</p>
    </div>
  )
}

export default AboutUsSection