
'use client';
import { useContext, useEffect, useState } from 'react';
import { SectorDataContext } from '@/context/apiContext';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './project.css';

gsap.registerPlugin(ScrollTrigger);

const ProjectSection = ({ section_4 }) => {
    const pagesDataApi = useContext(SectorDataContext);
    const mainData = pagesDataApi?.pagesDataApi?.find(page => page.slug === 'home')?.acf?.projects_section;
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (!section_4) return;

        let sections = gsap.utils.toArray('.prog_content');
        if (sections.length === 0) return;

        gsap.to(sections, {
            yPercent: -100 * (sections.length - 1),
            scrollTrigger: {
                trigger: `.${section_4}`,
                pin: true,
                start: 'top top',
                scrub: true,
                
                onUpdate: (self) => {
                    let progress = self.progress.toFixed(2);
                    let newIndex = Math.round(progress * (sections.length - 1));
                    setActiveIndex(newIndex);
                },
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [section_4]);

    return (
        <div className='container' id='proj_container'>
            <div className="proj_heading">

          <h2>{mainData?.heading}</h2>
            </div>
            
            <div className="proj_left_section">
                {mainData?.projects.map((project, index) => (
                    <>
                         
                    <div key={index} className={`proj_images ${index === activeIndex ? 'active' : ''}`}>
                        <img src={project.image} alt={project.name} />
                    </div>
               
                    </>
                ))}
            </div>

          
            <div className="proj_right_section">
                <div className='proj_section'>
                    {mainData?.projects?.length > 0 ? (
                        mainData.projects.map((project, index) => (
                            <div 
                                key={index} 
                                className={`prog_content ${index === activeIndex ? 'active' : ''}`}
                            >
                                <h1>{index+1}</h1>
                                <h4>{project.name}</h4>
                                <p>{project.description}</p>
                                
                            </div>
                        ))
                    ) : (
                        <p>No projects available.</p>
                    )}
                </div>
            </div>
            </div>
            


)}

export default ProjectSection