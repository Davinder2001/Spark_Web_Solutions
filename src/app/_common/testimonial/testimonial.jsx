"use client";
import { useContext } from 'react';
import { SectorDataContext } from '@/context/apiContext';

const Testimonial = () => {
  const { testimonialsApi } = useContext(SectorDataContext);
  return (
    <div className='container'>
    <h3></h3>
      {testimonialsApi?.map((section, sectionIndex) => (
        <div key={sectionIndex}>
        <img src={section.acf.image} alt='img'/>
          <h2>{section.acf.name}</h2>
          <h3>{section.acf.designation}</h3>
          <p>{section.acf.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Testimonial;
