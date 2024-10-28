'use client';
import { useContext} from 'react';
import { SectorDataContext } from '@/context/apiContext';

const OurServices = () => {
  const { pagesDataApi } = useContext(SectorDataContext);
  const mainData = pagesDataApi?.find(page => page.slug === 'home')?.acf?.our_service;



  return (
    <div className='container'>
    <marquee className='marquee'>
    <div className='marquee'>

      <h1>{mainData?.heading}</h1>
      <h1>{mainData?.heading}</h1>
      <h1>{mainData?.heading}</h1>
      <h1>{mainData?.heading}</h1>
      <h1>{mainData?.heading}</h1>
      <h1>{mainData?.heading}</h1>
      <h1>{mainData?.heading}</h1>
    </div>
    </marquee>
      <div className="services-container">
        {mainData?.cards?.map((card, index) => (
          <div key={index} className="service-card">
            <img src={card.card_icon} alt={card.card_heading} />
            <h3>{card.card_heading}</h3>
            <p>{card.card_description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurServices;
