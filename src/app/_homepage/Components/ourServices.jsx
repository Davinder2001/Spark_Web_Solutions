"use client";

import React, { useContext, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectorDataContext } from "@/context/apiContext";
import './homeServices.css'

gsap.registerPlugin(ScrollTrigger);

const HomeOurService = () => {
    const { pagesDataApi } = useContext(SectorDataContext);
    const main_data = pagesDataApi?.find(page => page.slug === "home")?.acf?.our_service;
    const cards_one = main_data?.cards || [];
    const cards_two = main_data?.cards_second || [];

    useEffect(() => {
        if (!cards_one.length && !cards_two.length) return;

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
                        scrub: 0.5
                    }
                });
            }
        });
    }, [cards_one, cards_two]);

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
