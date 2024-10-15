import React from 'react'
import SecondSection from './Components/secondSection'
import HeroSection from './Components/heroSection'
import OurServices from './Components/ourServices'
import ProjectSection from './Components/projectSection'
import TestimonialSection from './Components/testimonialSection'
import AboutUsSection from './Components/aboutUsSection'

const HomePage = () => {

  return (
    <>
    <HeroSection/>
    <SecondSection/>
    <AboutUsSection/>
    <OurServices/>
    <ProjectSection/>
    <TestimonialSection/>
    </>
  )
}

export default HomePage