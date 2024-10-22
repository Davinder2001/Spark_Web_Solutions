'use client'
import { useGSAP } from '@gsap/react'
import React, { useRef } from 'react'
import gsap from 'gsap'

const Page = () => {

const theRef = useRef()
useGSAP(()=>{
  gsap.to(theRef.current, {
    rotate:360,
    x:600,
    duration:2,
    yoyo:true,
    repeat:-1
  })
})

  return (
    <div className='container'>
      <div ref={theRef} id='box'></div>
    </div>
  )
}

export default Page