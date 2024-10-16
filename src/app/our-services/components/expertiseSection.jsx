'use client';
import { useContext } from 'react';
import { SectorDataContext } from '@/context/apiContext';


const ExpertiseSection = () => {
    const pagesDataApi = useContext(SectorDataContext);
    const mainData = pagesDataApi?.pagesDataApi?.find(page => page.slug === 'our-services')?.acf;
  return (
    <div>
        <h2>{mainData?.expertise_section_heading}</h2>
        <div className='' >
        {mainData && (
            mainData?.expertise?.map((card, index) => (
                <div key={index} className="expertise-card">
                <div className='card_1'>
                    <img src={card.expertise_icon} alt={card.card_heading} />
                    <h3>{card.expertise_heading}</h3>
                    <p>{card.expertise_sub_heading}</p>

                </div>
                
                </div>
            ))
        )

        }    {mainData && (
            mainData?.expertise_2?.map((card, index) => (
                <div key={index} className="expertise-card">
                <div className='card_1'>
                    <img src={card.expertise_icon} alt={card.card_heading} />
                    <h3>{card.expertise_heading}</h3>
                    <p>{card.expertise_sub_heading}</p>

                </div>
                
                </div>
            ))
        )

        }
            
        </div>
       
        
    </div>
  )
}

export default ExpertiseSection