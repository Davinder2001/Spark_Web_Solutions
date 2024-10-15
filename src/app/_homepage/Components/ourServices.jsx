'use client';
import { useContext } from 'react';
import { SectorDataContext } from '@/context/apiContext';

const OurServices = () => {
  const { pagesDataApi } = useContext(SectorDataContext);
  const mainData = pagesDataApi?.find(page => page.slug === 'home')?.acf?.our_service;



  return (
    <div>
      <h2>{mainData?.heading}</h2>
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
