'use client'
import { useContext } from 'react';
import { SectorDataContext } from '@/context/apiContext';


const Portfolio = () => {
    const pagesDataApi = useContext(SectorDataContext);
    const mainData = pagesDataApi.pagesDataApi?.find(page => page.slug === 'portfolio')?.acf;

  return (
    <div>
        <h2>{mainData?.page_heading}</h2>
        { mainData && (
            mainData.portfolio?.map((card, index) => (
                <div key={index} className="portfolio-card">
                    <img src={card.image} alt={card.project_name} />
                    <h3>{card.project_name} ({card.year})</h3>
                    {card && (
                        card.technology.map((technology, index) => (
                            <h3 key={index}>{technology.name} </h3>
                        ))
                    )

                    }
                    <p>{card.description}</p>
                </div>
            ))
        )

        }
    </div>
  )
}

export default Portfolio