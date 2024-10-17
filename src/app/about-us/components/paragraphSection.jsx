'use client';
import { useContext } from 'react';
import { SectorDataContext } from '@/context/apiContext';

const ParagraphSection = () => {
  const pagesDataApi = useContext(SectorDataContext);
  const mainData = pagesDataApi?.pagesDataApi?.find(page => page.slug === 'about-us')?.acf?.third_section;
  return (
    <div className="para-section container">
            {mainData && (
               <>
               {mainData.description_section?.map((section, index) => (
                <div key={index}>
                           <h2>{section.heading}</h2>
                          <p>{section.description}</p>
                          <img src={section.image} alt='image'/>
                        </div>
                        ))}
               </>
            )}
        </div>
  )
}

export default ParagraphSection