'use client';
import { useContext } from 'react';
import { SectorDataContext } from '@/context/apiContext';

const AboutUsMain = () => {
    const pagesDataApi = useContext(SectorDataContext);
    const mainData = pagesDataApi?.pagesDataApi?.find(page => page.slug === 'about-us')?.acf?.third_section;

    return (
        <div className="third-section container">
            {mainData && (
                <>
                <h1>{mainData.slider_text}</h1>
                    <h2>{mainData.heading}</h2>
                    <p>{mainData.small_description}</p>
                    <p>{mainData.main_description}</p>
                    <div className="image-gallery">
                        {mainData.image_gallery?.map((image, index) => (
                            <img key={index} src={image.images} alt={`Image ${index + 1}`} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default AboutUsMain;