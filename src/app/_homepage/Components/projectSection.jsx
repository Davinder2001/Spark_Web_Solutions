import React from 'react'

const ProjectSection = () => {
  return (
    <div>ProjectSection</div>
  )
}

export default ProjectSection







// 'use client'
// import { useContext } from 'react';
// import { SectorDataContext } from '@/context/apiContext';

// const ProjectSection = () => {
//     const pagesDataApi = useContext(SectorDataContext);
//     const mainData = pagesDataApi?.pagesDataApi?.find(page => page.slug === 'home')?.acf?.projects_section;
   
//     return (
//         <div className='container'>
//             {mainData && (
//                 <div className='dataa'>
//                     <h2>{mainData?.heading}</h2>
//                     {mainData.projects.map((project, index) => (
//                         <div key={index}>
//                             <img
//                                 src={project.image}
//                                 alt={project.name}
//                                 style={{ width: '200px', borderRadius: '5px' }}
//                             />
//                             <h4>{project.name}</h4>
//                             <p>{project.description}</p>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ProjectSection;
