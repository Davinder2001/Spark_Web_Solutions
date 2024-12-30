import React from 'react';
import Image from 'next/image';

const Loader = () => {
  return (
    <div className="loader">
      <Image
        src="/siteLogo/logo.jpg" 
        alt="Loading..."
        width={100}
        height={100}
        className="loading-img"
      />
    </div>
  );
};

export default Loader;
