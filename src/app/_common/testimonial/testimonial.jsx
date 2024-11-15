"use client";
import { useContext } from 'react';
import Image from 'next/image';
import { SectorDataContext } from '@/context/apiContext';

const Testimonial = () => {
  const { testimonialsApi } = useContext(SectorDataContext);
  return (
    <div className='container'>
    <div className="testimonials">
      <div className="testimonial-heading">
          <h3>What Our Clients Say About Us</h3>
      </div>
    <div className="testimonials-inner">
      {testimonialsApi?.map((section, sectionIndex) => (
        <div key={sectionIndex} className='testimonial'> 
        <div className="testimonial-inner">
          <div className="testimonial-background-img">
              <img src='/images/Vector5.png' className='test-m-1'/>
              <img src='/images/Vector6.png'  className='test-m-2'/>
          </div>
          <div className="testimonial-frontt">

          <div className="testimonial-image">
              <Image src={section.acf.image} 
              alt='img'
              layout="responsive" 
              width={100} 
              height={100} 
              />
          </div>
          <div className="testimonial-name">
            <h2>{section.acf.name}</h2>
          </div>
          <div className="testimonial-desg">
              <p>{section.acf.designation}</p>
          </div>
            <div className="qutee-img">
              <Image 
                src="/images/clarity_block-quote-line.png"
                alt="icon"
                width={40} // Adjust width
                height={40} // Adjust height to make it square
                layout="intrinsic" // Use intrinsic layout for icon-style images
              />
            </div>
            <div className="testimonial-main-text">
              <p>{section.acf.description}</p>
            </div>
          </div>
        </div>
      </div>
      ))}
      </div>
    </div>
    </div>
  );
};

export default Testimonial;
