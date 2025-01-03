'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SectorDataContext } from '@/context/apiContext';
import { useContext } from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { gsap } from 'gsap';

const Navigation = () => {
  const [isNavVisible, setNavVisible] = useState(false);
  const [isLoremVisible, setLoremVisible] = useState(false);

  const navRef = useRef(null);
  const loremRef = useRef(null);

  const pagesDataApi = useContext(SectorDataContext);
  const mainData = pagesDataApi?.pagesDataApi?.find((page) => page.slug === 'contact-us')?.acf;
  const { headerDataApi } = useContext(SectorDataContext);
  const mainDataHeader = headerDataApi?.find((page) => page.slug === 'header')?.acf;
  

  const toggleNav = () => {
    setNavVisible(true);
    setLoremVisible(false); // Hide Lorem Ipsum when Navigation is shown
  };

  const toggleLorem = () => {
    setLoremVisible(true);
    setNavVisible(false); // Hide Navigation when Lorem Ipsum is shown
  };

  const closeBoth = () => {
    setNavVisible(false);
    setLoremVisible(false);
  };

  // Animation for opening and closing
  useEffect(() => {
    if (isNavVisible) {
      gsap.fromTo(
        navRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
      );
    } else if (navRef.current) {
      gsap.to(navRef.current, { opacity: 0, y: -20, duration: 0.5, ease: 'power3.in' });
    }
  }, [isNavVisible]);

  useEffect(() => {
    if (isLoremVisible) {
      gsap.fromTo(
        loremRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
      );
    } else if (loremRef.current) {
      gsap.to(loremRef.current, { opacity: 0, y: -20, duration: 0.5, ease: 'power3.in' });
    }
  }, [isLoremVisible]);

  const handleNavLinkClick = () => {
    setNavVisible(false);
  };

  return (
    <div className="navigation-container">
      <div className="navigation-inner">
        {isNavVisible && (
          <div className="nav-wrapper" ref={navRef}>
            <div className="menu-wrapper-main">
              <Link href="/" className='nav-link-logo-menu'>
                <Image
                  className='nav-logo-menu'
                  src={mainDataHeader?.lite_mode_logo}
                  alt="Logo"
                  layout="responsive"
                  width={100}
                  height={50}
                />
              </Link>
              <nav className="main-header-navigation">
                <ul>
                  <li>
                    <Link href="/" onClick={handleNavLinkClick}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/about-us" onClick={handleNavLinkClick}>
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/internship" onClick={handleNavLinkClick}>
                      Internship
                    </Link>
                  </li>
                  <li>
                    <Link href="/portfolio" onClick={handleNavLinkClick}>
                      Portfolio
                    </Link>
                  </li>
                  <li>
                    <Link href="/our-services" onClick={handleNavLinkClick}>
                      Our Services
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" onClick={handleNavLinkClick}>
                      Blogs
                    </Link>
                  </li>
                </ul>
                <div className="after-nav-area">
                  <ul>
                    <li>
                      <Link href="/contact-us" onClick={handleNavLinkClick}>
                        Get In Touch
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        )}

        {isLoremVisible && (
          <div className="contact-menu-wrapper" ref={loremRef}>
            <Link href="/" className='nav-link-logo-menu'>
              <Image
                className='nav-logo-menu'
                src={mainDataHeader?.lite_mode_logo}
                alt="Logo"
                layout="responsive"
                width={100}
                height={50}
              />
            </Link>
            <nav className="stickey-contsct-wrapper">
              <h5>Contact Us</h5>
              <ul className="mail-no">
                  {mainDataHeader?.email_id && (
                    <li>
                      <a href={`mailto:${mainDataHeader.email_id}`}>{mainDataHeader.email_id}</a>
                    </li>
                  )}
                  {mainDataHeader?.contact_no && (
                    <li>
                      <a href={`tel:${mainDataHeader.contact_no}`}>{mainDataHeader.contact_no}</a>
                    </li>
                  )}
                </ul>

              <ul className="address">
                <li>{mainDataHeader?.address}</li>
              </ul>
            </nav>
            <div className="after-nav-area">
              <div className="social-icons">
                <a href={mainData?.facebook_link || '#'} target="_blank" rel="noopener noreferrer">
                  <FaFacebookF />
                </a>
                <a href={mainData?.instragram_link || '#'} target="_blank" rel="noopener noreferrer">
                  <FaInstagram />
                </a>
                <a href={mainData?.linkedin_link || '#'} target="_blank" rel="noopener noreferrer">
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          </div>
        )}

        <div className="all-buttons-container">
          {!isNavVisible && !isLoremVisible && (
            <div className="menu-button-container">
              <button
                onClick={toggleNav}
                aria-label="Open Menu"
                className="navbar-buttons-main navigation-menu-btn"
              >
                Menu
              </button>
              <span className="menu-devider">|</span>
              <button
                onClick={toggleLorem}
                aria-label="Show Contact Information"
                className="navbar-buttons-main navigation-contact-btn"
              >
                Contact
              </button>
            </div>
          )}

          {(isNavVisible || isLoremVisible) && (
            <button
              onClick={closeBoth}
              aria-label="Close Menu or Lorem Ipsum"
              className="close-btn-navigation navbar-buttons-main"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
