"use client";
import { useContext, useState, useEffect } from 'react';
import { SectorDataContext } from '@/context/apiContext';
import Link from 'next/link';

const Header = () => {
  const { headerDataApi } = useContext(SectorDataContext);
  const mainData = headerDataApi?.find(page => page.slug === 'header')?.acf;

  const [isPlaying, setIsPlaying] = useState(false); // State to track music play/mute
  const [audio, setAudio] = useState(null); // State to store the audio element

  useEffect(() => {
    // Set up the audio file dynamically from mainData.music
    if (mainData?.music) {
      const audioFile = new Audio(mainData.music);
      setAudio(audioFile);
    }
    return () => {
      // Cleanup the audio on component unmount
      if (audio) audio.pause();
    };
  }, [mainData?.music]); // Run effect when mainData.music changes

  const toggleMusic = () => {
    if (audio) {
      if (isPlaying) {
        audio.muted = true; // Mute the music
      } else {
        audio.muted = false; // Unmute the music
        if (audio.paused) audio.play(); // Ensure the music plays if paused
      }
      setIsPlaying(!isPlaying); // Toggle the play/mute state
    }
  };

  return (
    <div className='container'>
      <div className='header'>
        <h3>{mainData?.contact_no}</h3>
        <Link href='/'>
          <img src={mainData?.logo} alt='Logo' />
        </Link>
        <div className='icons'>

        <img src={mainData?.enquery_icon} alt='Enquiry Icon' />
        <img src={mainData?.light_mode_icon} alt='Light Mode Icon' />
        {/* Clickable music icon to toggle music (play/mute) */}
        <img
          src={mainData?.music_icon}
          alt='Music Icon'
          onClick={toggleMusic}
          style={{ cursor: 'pointer' }}
        />
        </div>
      </div>

      <nav>
        <ul style={{ display: 'flex', listStyleType: 'none', padding: 0, gap: '20px' }}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about-us">About</Link>
          </li>
          <li>
            <Link href="/internship">Internship</Link>
          </li>
          <li>
            <Link href="/portfolio">Portfolio</Link>
          </li>
          <li>
            <Link href="/our-services">Our Services</Link>
          </li>
          <li>
            <Link href="/contact-us">Contact Us</Link>
          </li>
          <li>
            <Link href="/blog">Blogs</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
