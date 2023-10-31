"use client";

import Image from "next/image";
import React from "react";
interface AatatProps {
  src: string | null | undefined;
}
const Avatar:React.FC<AatatProps> = ({src}) => {
  return (
    <Image
      className='rounded-full'
      alt='avatar'
      width={30}
      height={30}
      src={src||"/images/placeholder.jpg"}
    />
  );
};

export default Avatar;
