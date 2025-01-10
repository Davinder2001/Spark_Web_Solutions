'use client';
import { useContext, useState, useEffect, useRef } from 'react';
import { SectorDataContext } from '@/context/apiContext';
import Link from 'next/link';
import Image from 'next/image';
import EnquiryPopup from '../../popup/enqueryPopup';
import StickeyForm from '../../stickeyForm/stickeyForm';
import Logo from '../../logo/logo'; // Import the new Logo component
import { gsap } from 'gsap';

const HeaderContent = () => {
  const { headerDataApi } = useContext(SectorDataContext);
  const mainData = headerDataApi?.find((page) => page.slug === 'header')?.acf;

  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [isLiteMode, setIsDarkMode] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isStickyFormOpen, setIsStickyFormOpen] = useState(false); // New state for Sticky Form

  const popupRef = useRef(null);
  const stickyFormRef = useRef(null);

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

  const toggleStickyForm = () => {
    setIsStickyFormOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isPopupOpen) {
      gsap.fromTo(
        popupRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power4.out' }
      );
    } else if (popupRef.current) {
      gsap.to(popupRef.current, { opacity: 0, scale: 0.8, duration: 0.5, ease: 'power3.in' });
    }
  }, [isPopupOpen]);

  useEffect(() => {
    if (isStickyFormOpen) {
      gsap.fromTo(
        stickyFormRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power4.out' }
      );
    } else if (stickyFormRef.current) {
      gsap.to(stickyFormRef.current, { opacity: 0, y: 50, duration: 0.5, ease: 'power3.in' });
    }
  }, [isStickyFormOpen]);

  return (
    <div>
      <div className="header">
        <Link href={`tel:${mainData?.contact_no}`}>
          <h3>{mainData?.contact_no}</h3>
        </Link>

        {/* Header Logo */}
        <Link href="/" >
          <Logo isLiteMode={isLiteMode} />
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
      {/* Sticky Form Button */}
      <button className="sticky-form-button" onClick={toggleStickyForm}>
        Enquiry Now
      </button>

      {/* Popup Component for Sticky Form */}
      {isStickyFormOpen && (
        <div className="stikey-side-popup" ref={stickyFormRef}>
          <StickeyForm onClose={toggleStickyForm} />
        </div>
      )}

      {/* Enquiry Popup */}
      {isPopupOpen && (
        <div className="enquery-popup" ref={popupRef}>
          <EnquiryPopup onClose={togglePopup} />
        </div>
      )}
    </div>
  );
};

export default HeaderContent;
