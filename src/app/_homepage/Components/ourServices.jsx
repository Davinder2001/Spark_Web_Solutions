"use client";

import React, { useContext, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectorDataContext } from "@/context/apiContext";
import './homeServices.css'

gsap.registerPlugin(ScrollTrigger);

const HomeOurService = ({section_3}) => {
  console.log(section_3)
    const { pagesDataApi } = useContext(SectorDataContext);
    const main_data = pagesDataApi?.find(page => page.slug === "home")?.acf?.our_service;
    const cards_one = main_data?.cards || [];
    const cards_two = main_data?.cards_second || [];

    useEffect(() => {
        if (!cards_one.length && !cards_two.length) return;
        if(!section_3) return

        gsap.utils.toArray(".p_service_container").forEach((section, index) => {
            const w = section.querySelector(".p_service_wrapper");
            if (w) {
                const [x, xEnd] =
                    index % 2
                        ? ["100%", (w.scrollWidth - section.offsetWidth) * -1]
                        : [w.scrollWidth * -1, 0];

                gsap.fromTo(w, { x }, {
                    x: xEnd,
                    scrollTrigger: {
                        trigger: section,
                        scrub: 1,
                         
                    }
                });
            }
        });
    }, [cards_one, cards_two,section_3]);

    return (
        <>
        
                <div className="container" id="h_p_service">
                    
                   
                    <div className="p_service_container">
                        <div className="p_service_wrapper" id="p_h_heading_1">
                            {Array.from({ length: 2 }).map((_, index) => (
                                <h1 key={index}> <span>{main_data?.heading}</span></h1>
                            ))}
                        </div>
                    </div>

                 
                    <div className="p_service_container">
                        <div className="p_service_wrapper" id="p_h_heading_2">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <h1 key={index}> <span>{main_data?.heading}</span></h1>
                            ))}
                        </div>
                    </div>

                  
                    <div className="p_service_container">
                        <div className="p_service_wrapper">
                            {cards_one.map((ele, index) => (
                                <div className="p_card_section" key={index}>
                                    <div className="p_img">
                                        <img src={ele.card_icon || "/default.png"} alt={ele.card_heading} />
                                    </div>
                                    <div className="p_content">
                                        <h2>{ele.card_heading}</h2>
                                        <p>{ele.card_description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

               
                    <div className="p_service_container bottom">
                        <div className="p_service_wrapper">
                            {cards_two.map((ele, index) => (
                                <div className="p_card_section" key={index}>
                                    <div className="p_img">
                                        <img src={ele.card_icon || "/default.png"} alt={ele.card_heading} />
                                    </div>
                                    <div className="p_content">
                                        <h2>{ele.card_heading}</h2>
                                        <p>{ele.card_description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
       
        </>
    );
};

export default HomeOurService;


// 'use client';
// import React, { useContext, useEffect, useRef } from 'react';
// import { SectorDataContext } from '@/context/apiContext';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// const HomeOurService = () => {
 
//     const { pagesDataApi } = useContext(SectorDataContext);
//     const main_data = pagesDataApi?.find(page => page.slug === "home")?.acf?.our_service;
//     const cards_one = main_data?.cards || [];
//     const cards_two = main_data?.cards_second || [];

//     const expertiseList1Ref = useRef(null);
//     const expertiseList2Ref = useRef(null);
//     const scrollDirection = useRef('down'); // Keeps track of scroll direction

//     const list1AnimRef = useRef(null);
//     const list2AnimRef = useRef(null);

//     useEffect(() => {
//         let lastScroll = 0;

//         const updateScrollDirection = () => {
//             const currentScroll = window.scrollY;
//             scrollDirection.current = currentScroll > lastScroll ? 'down' : 'up';
//             lastScroll = currentScroll;
//         };

//         window.addEventListener('scroll', updateScrollDirection);

//         const duplicateContentIfNeeded = (container) => {
//             const items = Array.from(container.children);
//             const parentWidth = container.parentElement.offsetWidth;
//             let contentWidth = container.scrollWidth;

//             // Duplicate the content until it fills at least 3x the parent width
//             while (contentWidth < parentWidth * 3) {
//                 items.forEach((item) => {
//                     container.appendChild(item.cloneNode(true));
//                 });
//                 contentWidth = container.scrollWidth;
//             }
//         };

//         // Duplicate content for both lists
//         if (expertiseList1Ref.current) duplicateContentIfNeeded(expertiseList1Ref.current);
//         if (expertiseList2Ref.current) duplicateContentIfNeeded(expertiseList2Ref.current);

//         // Animation for first list
//         const animateList1 = () => {
//             const container = expertiseList1Ref.current;
//             return gsap.to(container, {
//                 x: () => (scrollDirection.current === 'down' ? -container.scrollWidth / 3 : container.scrollWidth / 3),
//                 repeat: -1,
//                 duration: 20,
//                 ease: 'none',
//                 modifiers: {
//                     x: gsap.utils.unitize((x) => parseFloat(x) % (container.scrollWidth / 3)), // Seamless loop
//                 },
//             });
//         };

//         // Animation for second list
//         const animateList2 = () => {
//             const container = expertiseList2Ref.current;
//             return gsap.to(container, {
//                 x: () => (scrollDirection.current === 'down' ? container.scrollWidth / 3 : -container.scrollWidth / 3),
//                 repeat: -1,
//                 duration: 20,
//                 ease: 'none',
//                 modifiers: {
//                     x: gsap.utils.unitize((x) => parseFloat(x) % (container.scrollWidth / 3)), // Seamless loop
//                 },
//             });
//         };

//         // Store animations in refs
//         list1AnimRef.current = animateList1();
//         list2AnimRef.current = animateList2();

//         ScrollTrigger.create({
//             onUpdate: () => {
//                 list1AnimRef.current.invalidate().restart(); // Restart animation with updated direction
//                 list2AnimRef.current.invalidate().restart();
//             },
//         });

//         return () => {
//             window.removeEventListener('scroll', updateScrollDirection);
//             list1AnimRef.current.kill();
//             list2AnimRef.current.kill();
//         };
//     }, []);

//     // Pause animations on hover
//     const handleMouseEnter = () => {
//         list1AnimRef.current.pause();
//         list2AnimRef.current.pause();
//     };

//     // Resume animations on mouse leave
//     const handleMouseLeave = () => {
//         list1AnimRef.current.play();
//         list2AnimRef.current.play();
//     };

//     return (
//         <div className='expertise'>
//             <h1>{cards_two?.heading}</h1>
//             <div
//                 className='expertises-list'
//                 ref={expertiseList1Ref}
//                 onMouseEnter={handleMouseEnter}
//                 onMouseLeave={handleMouseLeave}
//             >
//                 {cards_one?.map((card, index) => (
//                     <div key={index} className="expertise-card">
//                         <div className='card_1'>
//                             <div className="card-icon">
//                                 <img src={card.card_icon} alt={card.card_heading} />
//                             </div>
//                             <div className="card-description">
//                                 <h3>{card.card_heading}</h3>
//                                 <p>{card.description}</p>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
          
//             <div
//                 className='expertises-list reverse'
//                 ref={expertiseList2Ref}
//                 onMouseEnter={handleMouseEnter}
//                 onMouseLeave={handleMouseLeave}
//             >
//                 {cards_one?.map((card, index) => (
//                     <div key={index} className="expertise-card">
//                         <div className='card_1'>
//                             <div className="card-icon">
//                                 <img src={card.card_icon} alt={card.card_heading} />
//                             </div>
//                             <div className="card-description">
//                                 <h3>{card.card_heading}</h3>
//                                 <p>{card.description}</p>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default HomeOurService;





