'use client'
import { useContext } from 'react';
import { SectorDataContext } from '@/context/apiContext';

const ProjectSection = () => {
    const pagesDataApi = useContext(SectorDataContext);
    const mainData = pagesDataApi?.pagesDataApi?.find(page => page.slug === 'home')?.acf?.projects_section;
   
    return (
        <div className='container'>
            {mainData && (
                <>
                    <h2>{mainData?.heading}</h2>
                    {mainData.projects.map((project, index) => (
                        <div key={index} style={{ margin: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                            <img
                                src={project.image}
                                alt={project.name}
                                style={{ width: '200px', height: 'auto', borderRadius: '5px' }}
                            />
                            <h4>{project.name}</h4>
                            <p>{project.description}</p>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default ProjectSection;
