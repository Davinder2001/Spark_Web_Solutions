'use client';
import { useContext } from 'react';
import { SectorDataContext } from '@/context/apiContext';

const MapSection = () => {
    const pagesDataApi = useContext(SectorDataContext);
    const mainData = pagesDataApi?.pagesDataApi?.find(page => page.slug === 'contact-us')?.acf;
//    console.log('sasasa', mainData)
  return (
    <div>
           {/* Dynamically rendered map link */}
           {/* {mainData?.google_map_link && (
                <iframe
                    src={mainData.google_map_link}
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Map"
                ></iframe>
            )} */}

            {/* Dynamically rendered contact link */}
            {/* {mainData?.contact_link && (
                <div>
                    <a href={mainData.contact_link} target="_blank" rel="noopener noreferrer">
                        Contact Us
                    </a>
                </div>
            )} */}
            <div>
                <h3>{mainData?.card_heading}</h3>
                <p>{mainData?.main_office_address}</p>
                <p>{mainData?.phone_number}</p>
                <p>{mainData?.email_id}</p>
                <p>Icon</p>
                <p>Icon</p>
                <p>Icon</p>
            </div>
    </div>
  )
}

export default MapSection