'use client';

import { ThreeRenderScene } from '@/components/ThreeScene'
import SecondSectionOld from './Components/secondSection'
import AboutUsSection from './Components/aboutUsSection';
import OurServices from './Components/ourServices';

import TestimonialSection from './Components/testimonialSection';
import ProjectSection from './Components/projectSection';




function HomePage() {
  let section_0 = 'section_0'
  let section_1 = 'section_1'
  let section_2 = 'section_2'
  let section_3 = 'section_3'
  let section_4 = 'section_4'
  let section_5 = 'section_5'
  return (
    <>



      <button id="toggle">
        <img src="./images/preview.png" alt="Exit Fullscreen" />
      </button>


      <div className={`${section_0} section_outer_wrapper`}>

        <ThreeRenderScene />
      </div>

      <div className={`${section_1} section_outer_wrapper`}>
        <SecondSectionOld section_1={section_1} />
      </div>


      <div className={`${section_2} section_outer_wrapper`}>
        <AboutUsSection />
      </div>

      <div className={`${section_3} section_outer_wrapper`}>
        <OurServices />
      </div>


      <div className={`${section_4} section_outer_wrapper`}>
        <ProjectSection section_4={section_4} />
      </div>

      <div className={`${section_5} section_outer_wrapper`}>
        <TestimonialSection />
      </div>

    </>
  )
}

export default HomePage                     