'use client'
import { useContext } from 'react';
import { SectorDataContext } from '@/context/apiContext';
const SecondSection = () => {
  const sectorDataContext = useContext(SectorDataContext);
  const mainData = sectorDataContext?.homeSecondSection?.[0]?.acf?.['second-section']
 
  console.log('Data',mainData)


  return (
    <div>
      <h2>Second Section</h2>
    
    </div>
  );
};

export default SecondSection;
