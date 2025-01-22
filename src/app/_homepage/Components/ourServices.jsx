'use client';
import { useContext, useEffect, useRef } from 'react';
import { SectorDataContext } from '@/context/apiContext';
import gsap from 'gsap';

const OurServices = () => {
  const { pagesDataApi } = useContext(SectorDataContext);
  const mainData = pagesDataApi?.find(page => page.slug === 'home')?.acf?.our_service;

  console.log(mainData)

  const marqueeRef = useRef(null);
  const marqueeRef2 = useRef(null);

  useEffect(() => {
    if (mainData?.heading) {
      const marqueeWidth = marqueeRef.current.scrollWidth;

      gsap.to(marqueeRef.current, {
        x: `-${marqueeWidth / 2}px`, // Moves to the left by half the content width
        duration: 10, // Speed of marquee effect
        ease: "linear",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % (marqueeWidth / 2)) // Ensures seamless looping
        }
      });

      gsap.to(marqueeRef2.current, {
        x: `${marqueeWidth / 2}px`, // Moves to the right by half the content width
        duration: 10,
        ease: "linear",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % (marqueeWidth / 2))
        }
      });
    }
  }, [mainData]);

  return (
    <div className='our-service-home' style={{ height: '100vh' }}>
      {/* Marquee 1 - Forward */}
      <div className='marquee-wrapper'>
        <div className='marquee' ref={marqueeRef}>
          <h1>
            {mainData?.heading} &nbsp; {mainData?.heading} &nbsp; {mainData?.heading} &nbsp; {mainData?.heading} &nbsp; {mainData?.heading} &nbsp; {mainData?.heading} &nbsp; {mainData?.heading} &nbsp; {mainData?.heading}
          </h1>
        </div>
      </div>

      {/* Marquee 2 - Backward */}
      <div className='marquee-wrapper'>
        <div className='marquee-2' ref={marqueeRef2}>
          <h1>
            {mainData?.heading} &nbsp; {mainData?.heading} &nbsp; {mainData?.heading} &nbsp; {mainData?.heading} &nbsp; {mainData?.heading} &nbsp; {mainData?.heading} &nbsp; {mainData?.heading} &nbsp; {mainData?.heading}
          </h1>
        </div>
      </div>

      {/* Service Cards */}
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
