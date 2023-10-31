"use client";

import React, { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";

import useLoginModel from "@/app/hooks/useLoginModal";

import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/app/types";
import useRentModel from "@/app/hooks/useRentModel";
import useRegisterModel from "@/app/hooks/useRegisterModel";
interface UserMenuProps {
  currentUser?: SafeUser | null;
}
const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const registerModel = useRegisterModel();
  const rentModel = useRentModel();
  const loginModel = useLoginModel();
  const [open, setIsOpen] = useState(false);
  const toggleRentModel = useCallback(() => {
    if (!currentUser) {
      return loginModel.onOpen();
    }
    rentModel.onOpen();
  }, [loginModel, rentModel, currentUser]);
  const toggleIsOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3'>
        <div
          className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full 
        hover:bg-neutral-100
        transtion cursor-pointer '
          onClick={toggleRentModel}
        >
          Airbnb Your Home
        </div>
        <div
          onClick={toggleIsOpen}
          className='p-4 md:py-1 
        md:px-2
        border-[1px]
        rounded-full
        flex
        flex-row
        items-center
        gap-3
        cursor-pointer
        hover:shadow-md
        transition'
        >
          <AiOutlineMenu />
          <div className='hidden md:block'>
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {open && (
        <div
          className='rounded-xl absolute shadow-md w-[40vw] md:w-3/4 
        overflow-hidden bg-white right-0 top-12 text-sm '
        >
          <div className='flex flex-col cursor-pointer'>
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => {
                    router.push("/trips");
                  }}
                  label='My trips '
                />
                <MenuItem onClick={() => {}} label='My Favourite' />
                <MenuItem onClick={() => {router.push('/reservations')}} label='My Reservation' />
                <MenuItem onClick={() => {}} label='My Propirties' />
                <MenuItem onClick={rentModel.onOpen} label='Rental My Home' />
                <hr />
                <MenuItem
                  onClick={() => {
                    signOut();
                  }}
                  label='Logout'
                />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModel.onOpen} label='Sign in' />
                <MenuItem onClick={registerModel.onOpen} label='Sign up' />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
