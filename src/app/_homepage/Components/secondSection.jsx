'use client';

import { useContext, useState, useRef, useEffect } from 'react';
import { SectorDataContext } from '@/context/apiContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const SecondSection = () => {
  const pagesDataApi = useContext(SectorDataContext);
  const mainData = pagesDataApi?.pagesDataApi?.find(page => page.slug === 'home')?.acf?.second_section;

  // Log `mainData` to debug any potential `RegExp` objects
  console.log("mainData:", JSON.stringify(mainData, null, 2));

  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const sectionRefs = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      ".section-red",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: ".section-red",
          start: "top 80%",
          end: "bottom 20%",
        },
      }
    );

    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollTop = containerRef.current.scrollTop;
      const sectionHeight = containerRef.current.offsetHeight;
      const newIndex = Math.round(scrollTop / sectionHeight);

      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    };

    const container = containerRef.current;
    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [activeIndex]);

  const scrollToSection = (index) => {
    if (sectionRefs.current[index]) {
      sectionRefs.current[index].scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="main-wrapper">
      {/* Tabs Section */}
      <div className="tabs_outer">
        <img src="./images/circle.png" alt="Decorative circle" />
        <div className="tabs_holder">
          <div className="tabs">
            {Array.isArray(mainData) &&
              mainData.map((section, sectionIndex) => (
                <div
                  key={sectionIndex}
                  className={`tab ${activeIndex === sectionIndex ? 'active' : ''}`}
                  style={{
                    padding: '0.5rem 1rem',
                    cursor: 'pointer',
                    backgroundColor: activeIndex === sectionIndex ? '#007bff' : '#f0f0f0',
                    color: activeIndex === sectionIndex ? '#fff' : '#000',
                    marginBottom: '0.5rem',
                    borderRadius: '5px',
                    textAlign: 'center',
                  }}
                  onClick={() => scrollToSection(sectionIndex)}
                >
                  {String(section?.main_heading || 'Untitled')}
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div
        ref={containerRef}
        className="inner_container"
        style={{
          height: '100vh',
          overflowY: 'scroll',
          scrollSnapType: 'y mandatory',
          flex: 1,
        }}
      >
        <div className="second_section" style={{ height: '100%' }}>
          {Array.isArray(mainData) &&
            mainData.map((section, sectionIndex) => (
              <div
                key={sectionIndex}
                className={`inner-section section-red ${activeIndex === sectionIndex ? 'active' : ''}`}
                ref={(el) => (sectionRefs.current[sectionIndex] = el)}
                style={{
                  height: '100vh',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  scrollSnapAlign: 'start',
                  opacity: activeIndex === sectionIndex ? 1 : 0.4,
                  transition: 'opacity 0.3s ease',
                }}
              >
                <div className="description_outer">
                  {Array.isArray(section?.scroll_menu) &&
                    section.scroll_menu.map((item, itemIndex) => (
                      <div key={itemIndex} className="description">
                        <h3>{String(item?.heading || 'No Title')}</h3>
                        <p>{String(item?.description || 'No Description')}</p>
                      </div>
                    ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SecondSection;
