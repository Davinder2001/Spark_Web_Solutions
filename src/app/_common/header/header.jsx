import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <nav>
      <ul style={{ display: 'flex', listStyleType: 'none', padding: 0 , gap: '20px'}}>
        <li>
          <Link href="/" passHref>
            Home
          </Link>
        </li>
        <li>
          <Link href="/about-us" passHref>
            About
          </Link>
        </li>
        <li>
          <Link href="/internship" passHref>
            Internship
          </Link>
        </li>
        <li>
          <Link href="/portfolio" passHref>
            Portfolio
          </Link>
        </li>
        <li>
          <Link href="/our-services" passHref>
            Our Services
          </Link>
        </li>
        <li>
          <Link href="/contact-us" passHref>
            Contact Us
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;