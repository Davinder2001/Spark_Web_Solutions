'use client';
import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SectorDataContext } from '@/context/apiContext';

const MainBlogs = () => {
  const pagesDataApi = useContext(SectorDataContext);
  const mainData = pagesDataApi?.postDataApi;
  console.log(mainData)
  
  return (
    <div>
      {mainData?.map((blogs, index) => (
        <div key={index}>
          <h2>{blogs.title.rendered}</h2>
         
             {/* Display tags */}
             {blogs.acf?.tags && blogs.acf.tags.length > 0 && (
            <div>
              <h4>Tags:</h4>
              <ul>
                {blogs.acf.tags.map((tag, tagIndex) => (
                  <li key={tagIndex}>{tag.tag_name}</li> // Access the tag_name from each tag object
                ))}
              </ul>
            </div>
          )}


          {blogs._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
            <Image src={blogs._embedded['wp:featuredmedia'][0].source_url} alt={blogs.title.rendered}
                    layout="responsive" 
                    width={100} 
                    height={50} 
                    style={{ width: '100%', height: 'auto' }}  />
                  )}
                  <Link href={`/blog/${blogs.slug}`}>Read More</Link>
        </div>
        
      ))}
    </div>
  );
};

export default MainBlogs;
