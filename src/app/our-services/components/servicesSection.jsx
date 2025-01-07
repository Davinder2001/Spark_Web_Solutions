'use client';
import { useContext, useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { SectorDataContext } from '@/context/apiContext';
import ContactPopup from './popupForm'; // Import the ContactPopup component
import { gsap } from 'gsap';

const ServicesSection = () => {
    const pagesDataApi = useContext(SectorDataContext);
    const mainData = pagesDataApi?.pagesDataApi?.find(page => page.slug === 'our-services')?.acf;
    const [isPopupOpen, setIsPopupOpen] = useState(false); // Add state for popup
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedService, setSelectedService] = useState(''); // Add state for selected service
    const serviceCardsRef = useRef([]);
    const isScrolling = useRef(false);

    const handleContactClick = (e, serviceName) => {
        e.preventDefault(); // Prevent the default link behavior
        setSelectedService(serviceName); // Set the selected service name
        setIsPopupOpen(true);
    };

    useEffect(() => {
        const handleScroll = (e) => {
            e.preventDefault();
            if (isScrolling.current) return;

            const isScrollDown = e.deltaY > 0;

            // Scroll Forward
            if (isScrollDown && activeIndex < serviceCardsRef.current.length - 1) {
                isScrolling.current = true;
                setActiveIndex((prevIndex) => prevIndex + 1);
            }

            // Scroll Backward
            else if (!isScrollDown && activeIndex > 0) {
                isScrolling.current = true;
                setActiveIndex((prevIndex) => prevIndex - 1);
            } else {
                window.scrollBy(0, e.deltaY);
                return;
            }

            setTimeout(() => {
                isScrolling.current = false;
            }, 800);
        };

        window.addEventListener('wheel', handleScroll, { passive: false });

        return () => {
            window.removeEventListener('wheel', handleScroll);
        };
    }, [activeIndex]);

    useEffect(() => {
        serviceCardsRef.current.forEach((card, index) => {
            if (index === activeIndex) {
                gsap.fromTo(
                    card,
                    { opacity: 0, y: 100 },
                    { opacity: 1, y: 0, duration: 1 }
                );
            } else {
                gsap.set(card, { opacity: 0, y: 100 });
            }
        });
    }, [activeIndex]);

    return (
        <div className='services' style={{ overflow: 'hidden', height: '80vh' }}>
            <div className='page-title'>
                <h1>{mainData?.page_title}</h1>
            </div>
            <div className="service-cards-container" style={{ position: 'relative', height: '80vh' }}>
                {mainData &&
                    mainData.services?.map((service, index) => (
                        <div
                            key={index}
                            className="service-card-outer"
                            style={{
                                backgroundImage: `url(${service.service_background_image})`,
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '62vh',
                                display: activeIndex === index ? 'block' : 'none',
                            }}
                            ref={(el) => (serviceCardsRef.current[index] = el)}
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
                                        <button
                                            onClick={(e) => handleContactClick(e, service.service_name)}
                                            className='btn'
                                        >
                                            Talk To Our Experts
                                        </button>
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
                            <div className="overlay"></div>
                        </div>
                    ))}
            </div>
            <ContactPopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                serviceNames={mainData?.services?.map(service => service.service_name) || []}
                selectedService={selectedService} // Pass the selected service name
            />
        </div>
    );
};

export default ServicesSection;
