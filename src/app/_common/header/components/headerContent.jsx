'use client';
import { useContext, useState, useEffect } from 'react';
import { SectorDataContext } from '@/context/apiContext';
import Link from 'next/link';
import Image from 'next/image';
import EnquiryPopup from '../../popup/enqueryPopup';
import Logo from '../../logo/logo'; // Import the new Logo component

const HeaderContent = () => {
  const { headerDataApi } = useContext(SectorDataContext);
  const mainData = headerDataApi?.find(page => page.slug === 'header')?.acf;

  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [isLiteMode, setIsDarkMode] = useState(false);
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
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    document.body.classList.toggle('light-mode', isLiteMode);
  }, [isLiteMode]);

  const togglePopup = () => {
    setIsPopupOpen((prev) => !prev);
  };

  return (
    <div>
      <div className="header">
        {/* Header Mob No */}
        <h3>{mainData?.contact_no}</h3>

        {/* Header Logo */}
        <Link href="/">
          <Logo isLiteMode={isLiteMode} /> {/* Use the Logo component */}
        </Link>

        {/* Header End Icons */}
        <div className="icons">
          <Image
            src={mainData?.enquery_icon}
            alt="Enquiry Icon"
            onClick={togglePopup}
            width={35}
            height={35}
            style={{ cursor: 'pointer' }}
          />
          <Image
            src={isLiteMode ? mainData?.dark_mode_icon : mainData?.light_mode_icon}
            alt="Mode Icon"
            className="lite-dark-mode"
            onClick={toggleDarkMode}
            width={35}
            height={35}
            style={{ cursor: 'pointer' }}
          />
          <Image
            src={mainData?.music_icon}
            alt="Music Icon"
            onClick={toggleMusic}
            width={35}
            height={35}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>

      {/* Popup Component */}
      {isPopupOpen && (
        <div className={`popup ${isPopupOpen ? 'show' : ''}`}>
          <EnquiryPopup onClose={togglePopup} />
        </div>
      )}
    </div>
  );
};

export default HeaderContent;
