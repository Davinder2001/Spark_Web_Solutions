'use client';

import { useContext, useState, useRef, useEffect } from 'react';
import { SectorDataContext } from '@/context/apiContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import './secondSection.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const SecondSection = ({ section_1 }) => {
    const pagesDataApi = useContext(SectorDataContext);
    const mainData = pagesDataApi?.pagesDataApi?.find(page => page.slug === 'home')?.acf?.second_section || [];

    const [activeIndex, setActiveIndex] = useState(0);
    const sectionRefs = useRef([]);

    useEffect(() => {
        if (!section_1 || mainData.length === 0) return;

        let sections = gsap.utils.toArray('.content_section_wrapper');
        if (sections.length === 0) return;

        gsap.to(sections, {
            yPercent: -100 * (sections.length - 1),
            scrollTrigger: {
                trigger: `.${section_1}`,
                pin: true,
                start: 'top top',
                scrub: true,
                onUpdate: (self) => {
                    let newIndex = Math.round(self.progress * (mainData.length - 1));
                    setActiveIndex(newIndex);
                },
            },
        });
    }, [section_1, mainData]);

   
    const scrollToSection = (index) => {
        if (sectionRefs.current[index]) {
            setActiveIndex(index);  

            gsap.to(window, {
                scrollTo: {
                    y: sectionRefs.current[index].offsetTop, 
                    autoKill: false
                },
                duration: 1.2, 
                ease: 'power2.inOut',
            });
        }
    };

    return (
        <div className="container" id="section_section">
        
            {/* Left Section - Tabs */}
            <div className="left_section">
              <div className="tab_left_img">
              <img src="./images/circle.png" alt="" />
              </div>
                <div className="tabs_holder">
                    <div className="tabs">
                        {mainData?.map((section, sectionIndex) => (
                            <div
                                key={sectionIndex}
                                className={`tab ${activeIndex === sectionIndex ? 'active' : ''}`}
                                onClick={() => scrollToSection(sectionIndex)}  
                            >
                                {section?.main_heading || `Section ${sectionIndex + 1}`}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Section - Content */}
            <div className="right_section">
                <div className="second_section">
                    {mainData?.map((section, sectionIndex) => (
                      <>
                      
                        <div
                            key={sectionIndex}
                            className={`content_section_wrapper ${activeIndex === sectionIndex ? 'active' : ''}`}
                            ref={(el) => (sectionRefs.current[sectionIndex] = el)}
                        >
                          <div className="des_flex">

                           <h1>{activeIndex+1}</h1>
                            <div className="description_outer">
                                {(Array.isArray(section?.scroll_menu) ? section.scroll_menu : []).map((item, itemIndex) => (
                                    <div key={itemIndex} className="description_area">
                                        <h3>{item?.heading || `Heading ${itemIndex + 1}`}</h3>
                                        <p>{item?.description || `Description ${itemIndex + 1}`}</p>
                                    </div>
                                ))}
                            </div>
                          </div>
                        </div>
                       
                      </>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SecondSection;
