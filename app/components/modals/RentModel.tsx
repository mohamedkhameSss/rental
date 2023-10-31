"use client";

import React, { useCallback, useMemo, useState } from "react";

import dynamic from "next/dynamic";
import { FieldValues, useForm, SubmitHandler, set } from "react-hook-form";

import Modal from "./Modal";
import Heading from "../Heading";

import useRentModel from "@/app/hooks/useRentModel";

import { categories } from "../navbar/Categories";
import CategoryInput from "../Inputs/CategoryInput";
import CountrySelect from "../CountrySelect";
import Counter from "../Inputs/Counter";
import ImageUpload from "../Inputs/ImageUpload";
import Input from "../Inputs/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}
const RegisterModel = () => {
  const router = useRouter();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);
  const rentModel = useRentModel();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      categories: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });
  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");
  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    []
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };
  const onNext = () => {
    setStep((value) => value + 1);
  };
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }
    setIsLoading(true);
    axios.post("/api/listings", data).then(() => {
      toast.success("Listing Created!");
      router.refresh();
      reset();
      setStep(STEPS.CATEGORY);
      rentModel.onClose();
    });
  };
  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);
  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);
  let bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading
        title='Which of these best describes your place?'
        subTitle='Pick a category'
      />
      <div
        className='
       grid
       grid-cols-1
       md:grid-cols-2
       gap-3
       max-h-[50vh]
       overflow-y-auto

       '
      >
        {categories.map((item) => (
          <CategoryInput
            key={item.label}
            onClick={(category) => setCustomValue("category", category)}
            selected={category === item.label}
            label={item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Where is your place located'
          subTitle='Help geusts find you'
        />
        <CountrySelect
          onChange={(value) => setCustomValue("location", value)}
          value={location}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }
  if (step === STEPS.INFO) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Share some basics about your place'
          subTitle='What amenities do you have ?'
        />
        <Counter
          value={guestCount}
          title='Geust'
          subtitle='How many geusts do you allow?'
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <Counter
          value={roomCount}
          title='Geust'
          subtitle='How many geusts do you have?'
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <Counter
          value={bathroomCount}
          title='Bathroom'
          subtitle='How many bathroom do you have?'
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    );
  }
  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Add a photo of your place'
          subTitle='Show geusts what your place looks like!'
        />
        <ImageUpload
          onChange={(value) => setCustomValue("imageSrc", value)}
          value={imageSrc}
        />
      </div>
    );
  }
  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='How would you describe your place?'
          subTitle='Short and sweet works best!'
        />
        <Input
          id='title'
          label='Title'
          disabled={isLoading}
          errors={errors}
          register={register}
          required
        />
        <hr />
        <Input
          id='description'
          label='Description'
          disabled={isLoading}
          errors={errors}
          register={register}
          required
        />
      </div>
    );
  }
  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Now set your price'
          subTitle='How much do you charge per night?'
        />
        <Input
          id='price'
          label='Price'
          disabled={isLoading}
          required
          formatPrice
          type='number'
          register={register}
          errors={errors}
        />
      </div>
    );
  }
  return (
    <Modal
      isOpen={rentModel.isOpen}
      title='Rental Your Home'
      actionLabel={actionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      secondaryLabel={secondaryActionLabel}
      onClose={rentModel.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default RegisterModel;
