import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';
import HeaderSlides from './slides/HeaderSlides';

const HeroBanner = ({ heroBanner }) => {
  return (
    <div className="  overflow-hidden ">
      <HeaderSlides />
    </div>
  )
}

export default HeroBanner