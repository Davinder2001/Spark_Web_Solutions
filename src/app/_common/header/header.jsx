"use client";
import { useContext, useState, useEffect } from 'react';
import { SectorDataContext } from '@/context/apiContext';
import Link from 'next/link';
import Image from 'next/image';
import EnquiryPopup from '../popup/enqueryPopup'; // Import the Popup component

const Header = () => {
  const { headerDataApi } = useContext(SectorDataContext);
  const mainData = headerDataApi?.find(page => page.slug === 'header')?.acf;

  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  // const [isSticky, setIsSticky] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    if (mainData?.music) {
      const audioFile = new Audio(mainData.music);
      setAudio(audioFile);
    }
    return () => {
      if (audio) audio.pause();
    };
  }, [mainData?.music]);

  const toggleMusic = () => {
    if (audio) {
      if (isPlaying) {
        audio.muted = true;
      } else {
        audio.muted = false;
        if (audio.paused) audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  useEffect(() => {
    document.body.classList.toggle('dark-mode', !isDarkMode);
    document.body.classList.toggle('light-mode', isDarkMode);
  }, [isDarkMode]);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setIsSticky(window.scrollY > 0);
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  const togglePopup = () => {
    setIsPopupOpen(prev => !prev);
  };
  

  return (
    <div className='container'>
    {/* <div className={`container ${isSticky ? 'sticky-header' : ''}`}> */}
      <div className='header'>
        <h3>{mainData?.contact_no}</h3>
        <Link href='/'>
          <Image src={mainData?.logo} alt='Logo'
          layout="responsive" 
            width={100} 
            height={50}  />
        </Link>
        <div className='icons'>
          <Image
            src={mainData?.enquery_icon}
            alt='Enquiry Icon'
            onClick={togglePopup}
            layout="responsive" 
            width={100} 
            height={50} 
            style={{ cursor: 'pointer' }}
          />
          <Image
            src={isDarkMode ? mainData?.dark_mode_icon : mainData?.light_mode_icon}
            alt='Mode Icon'
            onClick={toggleDarkMode}
            style={{ cursor: 'pointer' }}
            layout="responsive" 
            width={100} 
            height={50} 
          />
          <Image
            src={mainData?.music_icon}
            alt='Music Icon'
            onClick={toggleMusic}
            style={{ cursor: 'pointer' }}
            layout="responsive" 
            width={100} 
            height={50} 
          />
        </div>
      </div>

      <nav>
        <ul style={{ display: 'flex', listStyleType: 'none', padding: 0, gap: '20px' }}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about-us">About</Link></li>
          <li><Link href="/internship">Internship</Link></li>
          <li><Link href="/portfolio">Portfolio</Link></li>
          <li><Link href="/our-services">Our Services</Link></li>
          <li><Link href="/contact-us">Contact Us</Link></li>
          <li><Link href="/blog">Blogs</Link></li>
        </ul>
      </nav>

      {/* Popup Component */}
      {/* Popup Component */}
{isPopupOpen && (
  <div className={`popup ${isPopupOpen ? 'show' : ''}`}>
    <EnquiryPopup onClose={togglePopup} />
  </div>
)}

    </div>
  );
};

export default Header;
