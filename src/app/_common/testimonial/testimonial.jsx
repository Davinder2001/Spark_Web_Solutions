"use client";
import { useContext } from 'react';
import Image from 'next/image';
import { SectorDataContext } from '@/context/apiContext';

const Testimonial = () => {
  const { testimonialsApi } = useContext(SectorDataContext);
  return (
    <div className='container'>
    <h3>What Our Clients Say About Us</h3>
    <div className="testimonials">
    <div className="testimonials-inner">
      {testimonialsApi?.map((section, sectionIndex) => (
        <div key={sectionIndex} className='testimonial'> 
        <div className="testimonial-inner">
          <div className="testimonial-image">
              <Image src={section.acf.image} 
              alt='img'
              layout="responsive" 
              width={100} 
              height={100} 
              />
          </div>
            <h2>{section.acf.name}</h2>
            <h3>{section.acf.designation}</h3>
            <Image src="/images/clarity_block-quote-line.png"
            alt='img'
            layout="responsive" 
            width={100} 
            height={100} 
            />
            <p>{section.acf.description}</p>
          </div>
        </div>
      ))}
      </div>
    </div>
    </div>
  );
};

export default Testimonial;
