'use client';
import { useContext, useState } from 'react';
import { SectorDataContext } from '@/context/apiContext';

const ThirdSection = () => {
  const pagesDataApi = useContext(SectorDataContext);
  const mainData = pagesDataApi?.pagesDataApi?.find(page => page.slug === 'internship')?.acf?.third_section;

  // State to track the active tab
  const [activeTab, setActiveTab] = useState(mainData?.tabs?.[0]?.id); // Initialize with the first tab's id

  return (
    <div>
      <h2>{mainData?.heading}</h2>
      {/* Tab Navigation */}
      <div style={{ display: 'flex', borderBottom: '1px solid #ccc', marginBottom: '1rem' }}>
        {mainData?.tabs?.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 20px',
              cursor: 'pointer',
              border: 'none',
              backgroundColor: activeTab === tab.id ? '#0070f3' : '#f1f1f1',
              color: activeTab === tab.id ? '#fff' : '#000',
              borderRadius: '4px',
              marginRight: '5px'
            }}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {mainData?.tabs?.map((tab) => (
          <div
            key={tab.id}
            style={{ display: activeTab === tab.id ? 'block' : 'none' }} // Show only active tab content
          >
            <h3>{tab.title}</h3>
            <p>{tab.content}</p> {/* Assuming each tab has a content field */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThirdSection;
