import React from 'react'
import Image from 'next/image';

const HeroSection = () => {
  return (
    <>

        <Image  src='/image.png' 
                alt='Image'
                layout="responsive" 
                width={100} 
                height={50} 
        />
      
</>
  )
}

export default HeroSection