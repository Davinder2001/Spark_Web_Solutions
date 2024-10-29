'use client';
import { useContext } from 'react';
import Link from 'next/link'; // Importing Link from Next.js
import { SectorDataContext } from '@/context/apiContext';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa'; // Importing icons

const MapSection = () => {
    const pagesDataApi = useContext(SectorDataContext);
    const mainData = pagesDataApi?.pagesDataApi?.find(page => page.slug === 'contact-us')?.acf;

    return (
        <div className='contact-map-section'>
            <div className='map-column'>
                {/* You can add a map or any other content here */}
            </div>
            <div className='contact-card'>
                <div className='card'>
                <h3>{mainData?.card_heading}</h3>
                <p>{mainData?.main_office_address}</p>
                <p>{mainData?.phone_number}</p>
                <p>{mainData?.email_id}</p>
                <div className='social-icons'>
                    <Link href='https://www.facebook.com' passHref>
                        <FaFacebookF />
                    </Link>
                    <Link href='https://www.instagram.com' passHref>
                        <FaInstagram />
                    </Link>
                    <Link href='https://www.linkedin.com' passHref>
                        <FaLinkedinIn />
                    </Link>
                </div>
                </div>
            </div>
        </div>
    );
}

export default MapSection;
