"use client";
import React, { ReactNode } from "react";

interface propsMenuItem {
  onClick: () => void;
  label: string;
}
const MenuItem: React.FC<propsMenuItem> = ({ onClick, label }) => {
  return (
    <div
      className='px-4 py-3 hover:bg-neutral-100 font-semibold transition'
      onClick={onClick}
    >
      {label}
    </div>
  );
};

export default MenuItem;
