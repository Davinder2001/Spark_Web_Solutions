'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import { SectorDataContext } from '@/context/apiContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ProjectSection = () => {
    const pagesDataApi = useContext(SectorDataContext);
    const projectsData = pagesDataApi?.pagesDataApi?.find(page => page.slug === 'home')?.acf?.projects_section;

    const [activeIndex, setActiveIndex] = useState(0);  
    const [visibleSections, setVisibleSections] = useState([0, 1, 2]);  
    const sectionRefs = useRef([]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        sectionRefs.current = sectionRefs.current.slice(0, projectsData?.projects.length || 0);

        sectionRefs.current.forEach((section, index) => {
            if (!section) return;

            ScrollTrigger.create({
                trigger: section,
                start: 'top 85%', // Adjusted start for better smoothness
                end: 'bottom 60%',
                scrub: 10, // Adds smooth effect
                onEnter: () => {
                    gsap.delayedCall(0.8, () => { // Increased delay for smoother transition
                        setActiveIndex(index); // Activate only 1 section at a time
                        setVisibleSections(prev => {
                            if (!prev.includes(index)) {
                                return [...prev.slice(1), index]; // Move visible sections forward
                            }
                            return prev;
                        });
                    });
                },
                onEnterBack: () => {
                    gsap.delayedCall(0.8, () => { // Increased delay for smoother transition
                        setActiveIndex(index); // Activate only 1 section at a time
                        setVisibleSections(prev => {
                            if (!prev.includes(index)) {
                                return [index, ...prev.slice(0, 2)]; // Move visible sections backward
                            }
                            return prev;
                        });
                    });
                }
            });
        });

        return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }, [projectsData]);

    return (
        <div className="container project_wrapper">
            <h2>{projectsData?.heading}</h2>

            <div className="proj_section">
                {/* Left Side - Image Display */}
                <div className="proj_section_first">
                    {projectsData?.projects.map((project, index) => (
                        <div
                            key={index}
                            className={`proj_image ${activeIndex === index ? 'active' : ''}`}
                            style={{
                                opacity: visibleSections.includes(index) ? 1 : 0, 
                                transition: 'opacity 1s ease-in-out', 
                                position: 'absolute',
                                width: '100%',
                            }}
                        >
                            <img src={project.image} alt={project.name} />
                        </div>
                    ))}
                </div>

                {/* Right Side - Text Content with Smooth Entry & Distance */}
                <div className="proj_section_second">
                    {projectsData?.projects.map((project, index) => (
                        <div
                            key={index}
                            ref={el => (sectionRefs.current[index] = el)}
                            className={`proj_text ${activeIndex === index ? 'active' : ''}`}
                            style={{
                                display: visibleSections.includes(index) ? 'block' : 'none', // Keep first 3 visible
                                opacity: activeIndex === index ? 1 : 0.2, // Only 1 active
                                transition: 'opacity 1s ease-in-out, transform 1s ease-in-out', // Smooth transition
                               
                                transitionDelay: '0.4s', // Delays the appearance for smoothness
                            }}
                        >
                            <h4>{project.name}</h4>
                            <p>{project.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectSection;
