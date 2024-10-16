'use client';
import { useContext } from 'react';
import { SectorDataContext } from '@/context/apiContext';

const ServicesSection = () => {
    const pagesDataApi = useContext(SectorDataContext);
    const mainData = pagesDataApi?.pagesDataApi?.find(page => page.slug === 'our-services')?.acf;
   
  return (
    <div>
        <h2>{mainData?.page_title}</h2>
        {mainData && (
            mainData.services?.map((service, index) => (
                <div key={index} className="service-card">
                    <h3>{service.service_name}</h3>
                    <p>{service.short_description}</p>
                    <p>{service.long_description}</p>
                    <img src={service.service_image} alt={service.service_title} />
                </div>
            ))
        )

        }
    </div>
  )
}

export default ServicesSection