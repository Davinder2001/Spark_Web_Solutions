'use client';
import { useContext } from 'react';
import { SectorDataContext } from '@/context/apiContext';

const SecondSection = () => {
  const sectorDataContext = useContext(SectorDataContext);
 
  const mainData = sectorDataContext?.homeSecondSection?.[0]?.acf?.['second-section'];
  return (
    <div>
      {mainData?.map((section, sectionIndex) => (
        <div key={sectionIndex}>
          <h2>{section.main_heading}</h2>
          {section.scroll_menu?.map((item, itemIndex) => (
            <div key={itemIndex}>
              <h3>{item.heading}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SecondSection;