'use client';
import { useContext } from 'react';
import { SectorDataContext } from '@/context/apiContext';

const SecondSection = () => {
  const pagesDataApi = useContext(SectorDataContext);
  const mainData = pagesDataApi?.pagesDataApi?.find(page => page.slug === 'home')?.acf?.second_section;

  return (
    <div className='container second_section'>
      <div className='second_section'>
       
        <div className="warpper_heading">
          {mainData?.map((section, sectionIndex) => (
            <div className='tabs_area' key={sectionIndex}>
              <h2>{section.main_heading}</h2>
            </div>
          ))}
        </div>

        
        <div className="all_paragraphs">
          {mainData?.map((section, sectionIndex) => (
            <div key={sectionIndex} className='description_outer'>
              {section.scroll_menu?.map((item, itemIndex) => (
                <div key={itemIndex} className='description'>
                  <h3>{item.heading}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecondSection;
