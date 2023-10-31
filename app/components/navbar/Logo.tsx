"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Logo = () => {
  const router = useRouter();
  return (
    <Image
      onClick={() => router.push("/")}
      alt='logo'
      width={100}
      height={100}
      src='/logo.png'
      className="cursor-pointer"
    />
  );
};

export default Logo;
