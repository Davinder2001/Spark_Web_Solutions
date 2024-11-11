'use client';
import { useContext } from 'react';
import Image from 'next/image';
import { SectorDataContext } from '@/context/apiContext';
import Link from 'next/link';

const ServicesSection = () => {
    const pagesDataApi = useContext(SectorDataContext);
    const mainData = pagesDataApi?.pagesDataApi?.find(page => page.slug === 'our-services')?.acf;

    return (
        <div className='services'>
            <div className='page-title'>
                <h1>{mainData?.page_title}</h1>
            </div>
            {mainData && (
                mainData.services?.map((service, index) => (
                    <div
                        key={index}
                        className="service-card-outer"
                        style={{
                            backgroundImage: `url(${service.service_background_image})`,
                        }}
                    >
                        <div className="service-card">
                            <div className='service-description'>
                                <div className='service-count'>
                                    <h2>{index + 1}</h2>
                                </div>
                                <div className='service-name'>
                                    <h3>{service.service_name}</h3>
                                </div>
                                <div className="main-descp">
                                    <div className="short-description">
                                        <h4>{service.short_description}</h4>
                                    </div>
                                    <div className="long-description">
                                        <p>{service.long_description}</p>
                                    </div>
                                </div>
                                <div className="contact-button">
                                    <Link href='/contact-us' className='btn'>Talk To Our Experts</Link>
                                </div>
                            </div>
                            <div className='service-image'>
                                <Image 
                                    src={service.service_image} 
                                    alt={service.service_title}
                                    layout="responsive" 
                                    width={100} 
                                    height={50}  
                                />
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default ServicesSection;
