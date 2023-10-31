"use client";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../Inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import useLoginModel from "@/app/hooks/useLoginModal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import RegisterModel from "./RegisterModel";
import useRegisterModel from "@/app/hooks/useRegisterModel";


const LoginModel = () => {
  const router = useRouter();
  const registerModal = useRegisterModel();

  const loginModel = useLoginModel();
  const [isloading, setiIsloading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { email: "", password: "" },
  });
  const onsubmit: SubmitHandler<FieldValues> = (data) => {
    setiIsloading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setiIsloading(false);
      if (callback?.ok) {
        toast.success("Logged in");
        router.refresh();
        loginModel.onClose();
      }
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };
  const onToggle = useCallback(() => {
    loginModel.onClose();
    registerModal.onOpen();
  }, [loginModel, registerModal]);
  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading title='Welcom back' subTitle='Sign in' />

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
        flex
        flex-col
        items-center
        w-full
        text-neutral-500
        text-center
        mt-4
        font-light
        '
      >
        <div className='flex flex-row items-center gap-2 '>
          <div>Dont have account</div>
          <div
            onClick={onToggle}
            className='
          text-neutral-800
          cursor-pointer
          hover:underline
          '
          >
            Register
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      disabled={isloading}
      isOpen={loginModel.isOpen}
      title='Sign In'
      actionLabel='Continue'
      onClose={loginModel.onClose}
      onSubmit={handleSubmit(onsubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModel;
