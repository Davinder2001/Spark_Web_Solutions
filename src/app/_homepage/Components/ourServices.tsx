'use client'
import { useContext } from 'react';
import { SectorDataContext } from '@/context/apiContext';


const OurServices = () => {
    const sectorDataContext = useContext(SectorDataContext);
    const mainData = sectorDataContext?.homeSecondSection?.[0]?.acf?.['our_service']
  
  return (
    <div>
            
            {mainData?.map((section: any, sectionIndex: number) => (
                <div key={sectionIndex}>

                    <h2>{section.heading}</h2>

               
                    {section.cards?.length > 0 && (
                        <div>
                           
                           <div>
    {section.cards.map((cardObj, cardIndex) => (
        <div key={cardIndex} style={{ margin: '20px', border: '1px solid #ccc', borderRadius: '5px', padding: '10px', textAlign: 'center' }}>
            <img
                src={cardObj.card_icon} // Access the icon URL directly
                alt={`${cardObj.card_heading} icon`} // Dynamic alt text
                style={{ width: '100px', height: 'auto', borderRadius: '5px' }} // Adjust size as needed
            />
            <h4>{cardObj.card_heading}</h4>
            <p>{cardObj.card_description}</p>
        </div>
    ))}
</div>

                        </div>
                    )}
                </div>
            ))}
        </div>
  )
}

export default OurServices