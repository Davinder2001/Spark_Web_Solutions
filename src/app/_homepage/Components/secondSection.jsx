'use client';
import { useContext } from 'react';
import { SectorDataContext } from '@/context/apiContext';

const SecondSection = () => {
  const pagesDataApi = useContext(SectorDataContext);
  const mainData = pagesDataApi?.pagesDataApi?.find(page => page.slug === 'home')?.acf?.second_section;

  return (
    <div className='container second_section_wrapper'>
      <div className='second_section'>


        <div className="tab_left_section">

          <div className="fix_bg">
            <div className="fix_bg_image">
              <img src="./images/circle_cirele.png" alt="" />
            </div>
          </div>

          <div className="tab_container">
            <div className="tab_holder" >
            {mainData?.map((section, sectionIndex) => (
                <div className='tabs_area' key={sectionIndex}>
                  <h2>{section.main_heading}</h2>
                </div>
            ))}
            </div>
          </div>
        </div>


        <div className="tab_right_section">

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
    </div>
  );
};

export default SecondSection;
