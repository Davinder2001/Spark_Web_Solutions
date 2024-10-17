'use client';
import { useContext } from 'react';
import Image from 'next/image';
import { SectorDataContext } from '@/context/apiContext';

const Page = ({ params }) => {
  const { slug }        = params;
  const pagesDataApi    = useContext(SectorDataContext);
  const mainData        = pagesDataApi?.postDataApi;
  const post            = mainData?.find((blog) => blog.slug === slug);
  const post_img        = post?.acf?.post_image 

  return (
    <div className='container'>
      <h2>{post?.title?.rendered}</h2>
     <Image src={post_img} 
            alt='img'
            layout="responsive" 
            width={100} 
            height={50} 
            style={{ width: '100%', height: 'auto' }} 
             />
      <div dangerouslySetInnerHTML={{ __html: post?.content?.rendered }} />
    </div>
  );
};

export default Page;
