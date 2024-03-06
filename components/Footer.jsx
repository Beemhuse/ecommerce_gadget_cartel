import React from 'react';
import { AiFillInstagram, AiOutlineTwitter} from 'react-icons/ai';

const Footer = () => {
  return (
    <footer className="bg-black h-[20vh] mt-auto text-white mt-8">
      <p>2024 Gadget Cartel All rights reserverd</p>
      <p className="flex justify-center text-center gap-4 text-white mt-auto">
        <AiFillInstagram />
        <AiOutlineTwitter />
      </p>
    </footer>
  )
}

export default Footer