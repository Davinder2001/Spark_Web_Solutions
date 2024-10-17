'use client';
import { useContext } from 'react';
import { SectorDataContext } from '@/context/apiContext';

const SecondSection = () => {
  const pagesDataApi = useContext(SectorDataContext);
  const mainData = pagesDataApi?.pagesDataApi?.find(page => page.slug === 'internship')?.acf?.second_section;

  // Function to strip HTML tags from the description
  const stripHtmlTags = (html) => {
    if (!html) return '';
    return html.replace(/<\/?[^>]+(>|$)/g, ""); // Regex to remove HTML tags
  };

  return (
    <div className='container'>
      <h2>{mainData?.heading}</h2>
      <p>{stripHtmlTags(mainData?.description)}</p> {/* Render plain text */}
    </div>
  );
}

export default SecondSection;
