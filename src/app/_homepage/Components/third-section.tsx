'use client'
import { useContext } from 'react';
import { SectorDataContext } from '@/context/apiContext';

const ThirdSection = () => {
    const sectorDataContext = useContext(SectorDataContext);
    const mainData = sectorDataContext?.homeSecondSection?.[0]?.acf?.['third_section'];
    
    return (
        <div>
            <h2>Third Section</h2>
            {mainData?.map((section: any, sectionIndex: number) => (
                <div key={sectionIndex}>
                    <h2>{section.heading}</h2>
                    <p>{section.small_description}</p>
                    <p>{section.main_description}</p>
             {section.image_gallery?.length > 0 && (
                        <div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                {section.image_gallery.map((imageObj: any, imageIndex: number) => (
                                    <img
                                        key={imageIndex}
                                        src={imageObj.images}  
                                        alt={`Gallery image ${imageIndex + 1}`} 
                                        style={{ width: '200px', height: 'auto', borderRadius: '5px' }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ThirdSection;
