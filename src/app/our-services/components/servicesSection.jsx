"use client"; // Enable client-side rendering for Next.js
import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const ServicesSection = () => {
  useEffect(() => {
    const getRatio = (el) =>
      window.innerHeight / (window.innerHeight + el.offsetHeight);

    // Select all sections and apply animations
    gsap.utils.toArray("section").forEach((section, i) => {
      const bgElement = section.querySelector(".bg");

      // Skip if there's no .bg element
      if (!bgElement) return;

      // Assign a background image dynamically
      section.bg = bgElement;
      section.bg.style.backgroundImage = `url(https://picsum.photos/1600/800?random=${i})`;

      // Apply GSAP animation for parallax effect
      gsap.fromTo(
        section.bg,
        {
          backgroundPosition: "50% 0px", // Initial background position
        },
        {
          backgroundPosition: `50% ${window.innerHeight * (1 - getRatio(section))}px`,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top", // Animation starts when section hits the top
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true, // Ensures responsiveness
          },
        }
      );
    });
  }, []);

  return (
    <div className="services-section">
      <section className="panel">
        <div className="bg"></div>
        <h1>Simple parallax sections</h1>
      </section>
      <section className="panel">
        <div className="bg"></div>
        <h1>Hey look, a title</h1>
      </section>
      <section className="panel">
        <div className="bg"></div>
        <h1>They just keep coming</h1>
      </section>
      <section className="panel">
        <div className="bg"></div>
        <h1>So smooth though</h1>
      </section>
      <section className="panel">
        <div className="bg"></div>
        <h1>Nice, right?</h1>
      </section>
    </div>
  );
};

export default ServicesSection;
