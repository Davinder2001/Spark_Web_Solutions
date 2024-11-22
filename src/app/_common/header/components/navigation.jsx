'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image';
import { SectorDataContext } from '@/context/apiContext';
import { useContext } from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Navigation = () => {
  const [isNavVisible, setNavVisible] = useState(false)
  const [isLoremVisible, setLoremVisible] = useState(false)


  const pagesDataApi = useContext(SectorDataContext);
    const mainData = pagesDataApi?.pagesDataApi?.find(page => page.slug === 'contact-us')?.acf;
    const { headerDataApi } = useContext(SectorDataContext);
    const mainDataHeader = headerDataApi?.find(page => page.slug === 'header')?.acf;

  const toggleNav = () => {
    setNavVisible(true)
    setLoremVisible(false) // Hide Lorem Ipsum when Navigation is shown
  }

  const toggleLorem = () => {
    setLoremVisible(true)
    setNavVisible(false) // Hide Navigation when Lorem Ipsum is shown
  }

  const closeBoth = () => {
    setNavVisible(false)
    setLoremVisible(false)
  }

  // Close menu on navigation link click
  const handleNavLinkClick = () => {
    setNavVisible(false)
  }

  return (
    <div className="navigation-container">
      <div className="navigation-inner">
        
        {isNavVisible && (
          <div style={{ color: '#111', backgroundColor: '#fff', borderRadius: '20px', padding: '10px'}}>
             <Link href='/'>
          <Image src={mainDataHeader?.lite_mode_logo} alt='Logo'
          layout="responsive" 
            width={100} 
            height={50}  />
        </Link>

          <nav>
            <ul>
              <li><Link href="/" onClick={handleNavLinkClick}>Home</Link></li>
              <li><Link href="/about-us" onClick={handleNavLinkClick}>About</Link></li>
              <li><Link href="/internship" onClick={handleNavLinkClick}>Internship</Link></li>
              <li><Link href="/portfolio" onClick={handleNavLinkClick}>Portfolio</Link></li>
              <li><Link href="/our-services" onClick={handleNavLinkClick}>Our Services</Link></li>
              <li><Link href="/contact-us" onClick={handleNavLinkClick}>Contact Us</Link></li>
              <li><Link href="/blog" onClick={handleNavLinkClick}>Blogs</Link></li>
            </ul>
          </nav>
          <div className="after-nav-area">
          <h3>Get In Touch</h3>
          </div>        
          </div>
        )}

        {isLoremVisible && (
          <div style={{ color: '#111', backgroundColor: '#fff', borderRadius: '20px', padding: '10px'}}>
            <Link href='/'>
                <Image src={mainDataHeader?.lite_mode_logo} alt='Logo'
                layout="responsive" 
                width={100} 
                height={50}  
                />
            </Link>
            <h5>Contact Us</h5>
             <nav>
            <ul>
              <li>
               <a href="mailto:example@gmail.com">example@gmail.com</a>
              </li>
              <li>
               <a href="tel:7018616800">7018616800</a>
              </li>
              <li>
              Tara Mata HouseKasumpti, Shimla, Himachal Pradesh 171009
              </li>
            </ul>
          </nav>
            <div className="after-nav-area">
              <div className='social-icons'>
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
          {/* Show buttons if neither section is open */}
          {!isNavVisible && !isLoremVisible && (
            <div className='menu-button-container'  style={{ backgroundColor: '#fff', borderRadius: '20px'}}>
              <button
                onClick={toggleNav}
                aria-label="Open Menu"
                style={{ padding: '10px 20px', backgroundColor: '#fff', color: '#111', cursor:'pointer', border: 'none'}}
              >
                Menu
              </button>

              <button
                onClick={toggleLorem}
                aria-label="Show Contact Information"
                style={{ padding: '10px 20px', backgroundColor: '#fff', color: '#111', cursor:'pointer', border: 'none'}}
              >
                Contact
              </button>
            </div>
          )}

          {/* Show "Close" button when one section is open */}
          {(isNavVisible || isLoremVisible) && (
            <button
              onClick={closeBoth}
              aria-label="Close Menu or Lorem Ipsum"
              style={{ marginBottom: '20px', padding: '10px 50px', backgroundColor: '#fff', borderRadius: '20px', color: '#111', cursor:'pointer' }}
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navigation
