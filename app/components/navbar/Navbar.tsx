import Container from "@/app/Container";
import React from "react";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { User } from "@prisma/client";
import { SafeUser } from "@/app/types";
import Categories from "@/app/components/navbar/Categories";
import Categ from "./Categ";

interface Props {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<Props> = ({ currentUser }) => {
  return (
    <>
      <div className='fixed w-full bg-white z-10 shadow-sm'>
        <div className='py-4 border-b-[1px]'>
          <Container>
            <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
              <Logo />
              <Search />
              <UserMenu currentUser={currentUser} />
            </div>
          </Container>
        </div>
        <Categories />
      </div>
    </>
  );
};

export default Navbar;
