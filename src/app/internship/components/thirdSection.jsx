'use client';
import { useContext, useState } from 'react';
import { SectorDataContext } from '@/context/apiContext';

const ThirdSection = () => {
  const pagesDataApi = useContext(SectorDataContext);
  const mainData = pagesDataApi?.pagesDataApi?.find(page => page.slug === 'internship')?.acf?.third_section;

  // State to track the active tab
  const [activeTab, setActiveTab] = useState('all'); // Initialize with 'all' for the "All Courses" tab

  return (
    <div className='courses-main-outer container'>
      {/* Tab Navigation */}
      <div style={{ display: 'flex', marginBottom: '1rem' }}>
        {/* "All Courses" button */}
        <button
          onClick={() => setActiveTab('all')}
          style={{
            padding: '10px 20px',
            cursor: 'pointer',
            border: 'none',
            backgroundColor: activeTab === 'all' ? '#F24B74' : '#f1f1f1',
            color: activeTab === 'all' ? '#fff' : '#000',
            borderRadius: '40px',
            marginRight: '5px'
          }}
          
        >
          All Courses
        </button>
        {/* Dynamic Tab Buttons */}
        {mainData?.map((tab) => (
          <button
            key={tab.course_name}
            onClick={() => setActiveTab(tab.course_name)}
            style={{
              padding: '10px 20px',
              cursor: 'pointer',
              border: 'none',
              backgroundColor: activeTab === tab.course_name ? '#F24B74' : '#f1f1f1',
              color: activeTab === tab.course_name ? '#fff' : '#000',
              borderRadius: '40px',
              marginRight: '5px'
            }}
          >
            {tab.course_name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className='content-wrapper'>
        {activeTab === 'all' ? (
          // Show all courses if "All Courses" is active
          mainData?.map((tab) => (
            <div key={tab.course_name} className='tab-content-wrapper'>
              {tab.courses_details?.map((course, index) => (
                <div key={index} className='single-course-wrapper'>
                  <h3>{course.course_heading}</h3>
                  <p dangerouslySetInnerHTML={{ __html: course.course_description }}></p>
                </div>
              ))}
            </div>
          ))
        ) : (
          // Show content for the selected tab
          mainData?.map((tab) => (
            <div
              key={tab.course_name}
              style={{ display: activeTab === tab.course_name ? 'block' : 'none' }} // Show only active tab content
              className=''
            >
            <div className='tab-content-wrapper'>

              {tab.courses_details?.map((course, index) => (
                <div key={index}>
                  <h3>{course.course_heading}</h3>
                  <p dangerouslySetInnerHTML={{ __html: course.course_description }}></p>
                </div>
              ))}
            </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ThirdSection;
