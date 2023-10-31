"use client";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";

import { error } from "console";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../Inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { signIn } from "next-auth/react";
import useLoginModel from "@/app/hooks/useLoginModal";
import useRegisterModel from "@/app/hooks/useRegisterModel";

const RegisterModel = () => {
  const RegisterModel = useRegisterModel();
  const LoginModal = useLoginModel();
  const toggleModel = useCallback(() => {
    RegisterModel.onClose();
    LoginModal.onOpen();
  }, [RegisterModel, LoginModal]);
  const [isloading, setiIsloading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: "", email: "", password: "" },
  });
  const onsubmit: SubmitHandler<FieldValues> = (data) => {
    setiIsloading(true);
    axios
      .post(`/api/register`, data)
      .then(RegisterModel.onClose)
      .catch((error) => {
        toast.error("Could not register");
      })
      .finally(() => setiIsloading(false));
  };
  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading title='Welcom to Rental' subTitle='Create an account' />

      <Input
        id='email'
        errors={errors}
        label='Email'
        register={register}
        disabled={isloading}
        required
        type='email'
      />
      <Input
        id='name'
        errors={errors}
        label='Name'
        register={register}
        disabled={isloading}
        required
      />
      <Input
        id='password'
        type='password'
        errors={errors}
        label='Password'
        register={register}
        disabled={isloading}
        required
      />
    </div>
  );
  const footerContent = (
    <div className=' flex flex-col gap-4 mt-3'>
      <hr />
      <Button
        outline
        label='Continue with Google'
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label='Continue with Github'
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div
        className='
      text-neutral-500
        flex
        flex-col
        items-center
        text-center
        mt-4
        font-light
    '
      >
        <div className='flex flex-row items-center gap-2'>
          <div>Already have an account</div>
          <div
            onClick={toggleModel}
            className='
      text-neutral-800
      cursor-pointer
      hover:underline
      '
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      disabled={isloading}
      isOpen={RegisterModel.isOpen}
      title='Register'
      actionLabel='Continue'
      onClose={RegisterModel.onClose}
      onSubmit={handleSubmit(onsubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModel;
