'use client';
import { useContext, useState, useEffect } from 'react';
import Image from 'next/image';
import { SectorDataContext } from '@/context/apiContext';

const AboutUsMain = () => {
    const pagesDataApi = useContext(SectorDataContext);
    const mainData = pagesDataApi?.pagesDataApi?.find(page => page.slug === 'about-us')?.acf?.third_section;

    // Set the initial main image to the first image in the gallery on component load
    const [mainImage, setMainImage] = useState(null);

    // Ensure the first image is set as the main image on initial render
    useEffect(() => {
        if (mainData?.image_gallery?.length > 0) {
            setMainImage(mainData.image_gallery[0].images);
        }
    }, [mainData]);

    const handleThumbnailClick = (newMainImage) => {
        setMainImage(newMainImage);
    };

    return (
        <div className="about-us-main container">
            {mainData && (
                <div className='first-section-inner'>
                    <div className="page-title">
                        <h1>{mainData.slider_text}</h1>
                    </div>
                    <div className="short-description">
                        <p>{mainData.small_description}</p>
                    </div>
                    
                <div className='image-gallery-container'>
                    {/* Display the main image */}
                    {mainImage && (
                        <div className="top-big-image">
                            <Image 
                                src={mainImage} 
                                alt="Main Image"
                                layout="responsive" 
                                width={100} 
                                height={100} 
                            />
                        </div>
                    )}

                    <div className="description-column-main">
                        {/* <div className=" background"> */}
                            <h2 className='page-heading lite-bg-heading'>{mainData.heading}</h2>
                        {/* </div> */}
                        <div className='main-description'>
                            <p>{mainData.main_description}</p>
                        </div>
                    
                    <div className="image-gallery inline-thumbnails">
                        {mainData.image_gallery?.map((image, index) => (
                            <div 
                                key={index} 
                                className={`thumbnail ${mainImage === image.images ? 'active' : ''}`} 
                                onClick={() => handleThumbnailClick(image.images)}
                            >
                                <Image  
                                    src={image.images} 
                                    alt={`Thumbnail ${index + 1}`}
                                    layout="fixed" 
                                    width={100} 
                                    height={100} 
                                    className="thumbnail-image"
                                />
                            <div className="overlay"></div>
                            </div>
                            
                        ))}
                        </div>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
};

export default AboutUsMain;
