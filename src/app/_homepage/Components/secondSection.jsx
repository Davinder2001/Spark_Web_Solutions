'use client';

import React, { useState, useContext } from 'react';
import { SectorDataContext } from '@/context/apiContext';

const SecondSection = () => {
  const pagesDataApi = useContext(SectorDataContext);
  const mainData = pagesDataApi?.pagesDataApi?.find((page) => page.slug === 'home')?.acf?.second_section || [];
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  const handleButtonClick = (sectionIndex) => {
    setActiveSectionIndex(sectionIndex);
  };

  return (
    <div className="main-wrapper" style={{ height: '100vh', display: 'flex' }}>

      <div
        className="left-column"
  
      >
        {mainData.map((section, sectionIndex) => (
          <button
            key={sectionIndex}
            onClick={() => handleButtonClick(sectionIndex)}
            style={{
              display: 'block',
              width: '100%',
              padding: '0.5rem 1rem',
              marginBottom: '1rem',
              textAlign: 'left',
              backgroundColor:
                sectionIndex === activeSectionIndex ? '#0070f3' : '#eee',
              color: sectionIndex === activeSectionIndex ? '#fff' : '#000',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {section.main_heading || `Section ${sectionIndex + 1}`}
          </button>
        ))}
      </div>

      <div
        className="right-column"
        style={{
          flex: 1,
          height: '100vh',
          overflowY: 'auto',
          padding: '1rem',
        }}
      >
        {mainData.map((section, sectionIndex) => (
          <div
            key={sectionIndex}
            style={{
              display: sectionIndex === activeSectionIndex ? 'block' : 'none',
              padding: '1rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              minHeight: '40vh',
            }}
          >
            <h2>{section.main_heading || `Section ${sectionIndex + 1}`}</h2>
            {section.scroll_menu && section.scroll_menu.length > 0 && (
              <div className="sub-items" style={{ marginTop: '1rem' }}>
                {section.scroll_menu.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="sub-item"
                    style={{
                      marginBottom: '1rem',
                      padding: '0.5rem',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                    }}
                  >
                    {item.heading && <h3>{item.heading}</h3>}
                    {item.description && <p>{item.description}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecondSection;
