'use client';
import { useContext, useState } from 'react';
import Link from 'next/link';
import { SectorDataContext } from '@/context/apiContext';

const ThirdSection = () => {
  const pagesDataApi = useContext(SectorDataContext);
  const mainData = pagesDataApi?.pagesDataApi?.find(page => page.slug === 'internship')?.acf?.third_section;

  // State to track the active tab
  const [activeTab, setActiveTab] = useState('all'); 
  const filteredCourses = activeTab === 'all'
    ? mainData?.flatMap(tab => tab.courses_details) // Show all courses when 'all' is selected
    : mainData?.find(tab => tab.course_name === activeTab)?.courses_details;

  return (
    <div className='courses-main-outer container'>
      {/* Tabs Navigation */}
      <div className='tabs-container-btns'>
        {/* "All Courses" Button */}
        <button
          onClick={() => setActiveTab('all')}
          className={`tabs-button ${activeTab === 'all' ? 'active' : ''}`} 
        >
          All Courses
        </button>

        {/* Dynamic Buttons for Each Tab */}
        {mainData?.map((tab) => (
          <button
            key={tab.course_name}
            onClick={() => setActiveTab(tab.course_name)}
            className={`tabs-button ${activeTab === tab.course_name ? 'active' : ''}`} 
          >
            {tab.course_name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className='tab-content-wrapper'>
        {filteredCourses?.map((course, index) => (
          <div key={index} className='single-course-wrapper'>
            <h3>{course.course_heading}</h3>
            <p dangerouslySetInnerHTML={{ __html: course.course_description }}></p>
            <Link className='join-cource-btn' href='/contact-us'>Join Courses</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThirdSection;
