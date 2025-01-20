'use client';
import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import SecondSection from './Components/secondSection';
import OurServices from './Components/ourServices';
import ProjectSection from './Components/projectSection';
import TestimonialSection from './Components/testimonialSection';
import AboutUsSection from './Components/aboutUsSection';
import HeroSection from './Components/heroSection';

gsap.registerPlugin(ScrollToPlugin);

const HomePage = () => {
  const sectionsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollTween = useRef(null);

  const scrollToSection = (index) => {
    const clampedIndex = Math.max(0, Math.min(index, sectionsRef.current.length - 1));
    setActiveIndex(clampedIndex); 
    scrollTween.current = gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: sectionsRef.current[clampedIndex], autoKill: false },
      ease: 'power2.inOut',
      onComplete: () => {
        scrollTween.current = null;
      },
      overwrite: true,
    });
  };

  useEffect(() => {
    const handleWheel = (e) => {
      if (scrollTween.current) {
        e.preventDefault();
        return;
      }
      
      e.preventDefault();
      
      const deltaY = e.deltaY;
      if (deltaY > 0 && activeIndex < sectionsRef.current.length - 1) {
        scrollToSection(activeIndex + 1);
      } else if (deltaY < 0 && activeIndex > 0) {
        scrollToSection(activeIndex - 1);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [activeIndex]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = sectionsRef.current.indexOf(entry.target);
          if (index !== -1 && scrollTween.current === null) {
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
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className="navigation_buttons">
        {sectionsRef.current.map((_, i) => (
          <button
            key={i}
            className={activeIndex === i ? 'active' : ''}
            onClick={() => scrollToSection(i)}
          >
            <p></p>
          </button>
        ))}
      </div>

      <div
        className={`section_0 ${activeIndex === 0 ? 'active' : ''}`}
        ref={(el) => (sectionsRef.current[0] = el)}
      >
        <HeroSection />
      </div>

      <div id="next_section_wrapper">
        <div
          className={`section_1 ${activeIndex === 1 ? 'active' : ''}`}
          ref={(el) => (sectionsRef.current[1] = el)}
        >
          <SecondSection />
        </div>
        <div
          className={`section_2 ${activeIndex === 2 ? 'active' : ''}`}
          ref={(el) => (sectionsRef.current[2] = el)}
        >
          <AboutUsSection />
        </div>
        <div
          className={`section_3 ${activeIndex === 3 ? 'active' : ''}`}
          ref={(el) => (sectionsRef.current[3] = el)}
        >
          <OurServices />
        </div>
        <div
          className={`section_4 ${activeIndex === 4 ? 'active' : ''}`}
          ref={(el) => (sectionsRef.current[4] = el)}
        >
          <ProjectSection />
        </div>
        <div
          className={`section_5 ${activeIndex === 5 ? 'active' : ''}`}
          ref={(el) => (sectionsRef.current[5] = el)}
        >
          <TestimonialSection />
        </div>
      </div>
    </>
  );
};

export default HomePage;
