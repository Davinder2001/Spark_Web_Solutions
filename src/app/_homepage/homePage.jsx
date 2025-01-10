'use client';
import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import SecondSection from './Components/secondSection';
import OurServices from './Components/ourServices';
import ProjectSection from './Components/projectSection';
import TestimonialSection from './Components/testimonialSection';
import AboutUsSection from './Components/aboutUsSection';
import { ThreeRenderScene } from '@/components/ThreeScene';

gsap.registerPlugin(ScrollToPlugin);

const HomePage = () => {
  const sectionsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToSection = (index) => {
    setActiveIndex(index);
    gsap.to(window, {
      duration: 1.5,
      scrollTo: sectionsRef.current[index],
      ease: 'power2.inOut',
    });
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // Section is considered visible when 50% of it is in the viewport
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = sectionsRef.current.indexOf(entry.target);
          if (index !== -1) {
            setActiveIndex(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sectionsRef.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      observer.disconnect(); // Cleanup observer on component unmount
    };
  }, []);

  return (
    <>
      <ThreeRenderScene />

      <div className="navigation_buttons">
        <button
          className={activeIndex === 0 ? 'active' : ''}
          onClick={() => scrollToSection(0)}
        >
          <p></p>
        </button>
        <button
          className={activeIndex === 1 ? 'active' : ''}
          onClick={() => scrollToSection(1)}
        >
          <p></p>
        </button>
        <button
          className={activeIndex === 2 ? 'active' : ''}
          onClick={() => scrollToSection(2)}
        >
          <p></p>
        </button>
        <button
          className={activeIndex === 3 ? 'active' : ''}
          onClick={() => scrollToSection(3)}
        >
          <p></p>
        </button>
        <button
          className={activeIndex === 4 ? 'active' : ''}
          onClick={() => scrollToSection(4)}
        >
          <p></p>
        </button>
      </div>

      <div id="next_section_wrapper">
        <div
          className={`section_1 ${activeIndex === 0 ? 'active' : ''}`}
          ref={(el) => (sectionsRef.current[0] = el)}
        >
          <SecondSection />
        </div>
        <div
          className={`section_2 ${activeIndex === 1 ? 'active' : ''}`}
          ref={(el) => (sectionsRef.current[1] = el)}
        >
          <AboutUsSection />
        </div>
        <div
          className={`section_3 ${activeIndex === 2 ? 'active' : ''}`}
          ref={(el) => (sectionsRef.current[2] = el)}
        >
          <OurServices />
        </div>
        <div
          className={`section_4 ${activeIndex === 3 ? 'active' : ''}`}
          ref={(el) => (sectionsRef.current[3] = el)}
        >
          <ProjectSection />
        </div>
        <div
          className={`section_5 ${activeIndex === 4 ? 'active' : ''}`}
          ref={(el) => (sectionsRef.current[4] = el)}
        >
          <TestimonialSection />
        </div>
      </div>
    </>
  );
};

export default HomePage;
