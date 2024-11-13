import React from 'react'
import Link from 'next/link'

const Navigation = () => {
  return (
    <nav>
    <ul style={{ display: 'flex', listStyleType: 'none', padding: 0, gap: '20px', justifyContent: 'center' }}>
      <li><Link href="/">Home</Link></li>
      <li><Link href="/about-us">About</Link></li>
      <li><Link href="/internship">Internship</Link></li>
      <li><Link href="/portfolio">Portfolio</Link></li>
      <li><Link href="/our-services">Our Services</Link></li>
      <li><Link href="/contact-us">Contact Us</Link></li>
      <li><Link href="/blog">Blogs</Link></li>
    </ul>
  </nav>
  )
}

export default Navigation