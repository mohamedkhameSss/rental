import React from "react";
interface componentProps {
  children: React.ReactNode;
}

const Container: React.FC<componentProps> = ({ children }) => {
  return (
    <nav
      className='max-w-[2520px]
    mx-auto
    xl:px20
    md:px10
    sm:px2
    px-4
    '
    >
      {children}
    </nav>
  );
};

export default Container;
