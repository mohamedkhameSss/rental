"use client";
import React, { FC, useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";
interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  title: string;
  actionLabel: string | undefined;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryLabel?: string;
}
const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  body,
  footer,
  title,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);
  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);
  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);
  const handleOnSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [onSubmit, disabled]);
  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }
    secondaryAction();
  }, [secondaryAction, disabled]);
  if (!isOpen) {
    return null;
  }
  return (
    <div
      className='
      
  flex
  justify-center
  items-center
  overflow-x-hidden
  overflow-y-auto
  inset-0
  z-50
  outline-0
  outline-none
  focus:outline-none
  bg-neutral-800/70
  fixed
  '
    >
      <div
        className='
        relative
        w-full
        md:w-4/6
        lg:w-3/6
        xl:w-2/5
        my-6
        mx-auto
        h-full
        lg:h-auto
        md:h-auto
        '

      >
        {/* content */}
        <div
          className={`
            translate
            duration-300
            h-full
            ${showModal ? "translate-y-0" : "translate-y-full"}
            ${showModal ? "opacity-100" : "opacity-0"}
            `}
        >
          <div
            className='
            translate
            h-full
            lg:h-auto
            md:h-auto
            border-0
            rounded-lg
            shadow-md
            relative
            flex
            flex-col
            w-full
            bg-white
            outline-none
            focus:outline-none
            '
          >
            {/* header */}
            <div
              className='
                flex
                items-center
                p-6
                rounded-t
                justify-center
                relative
                border-b-[1px]
                '
            >
              <button
                onClick={handleClose}
                className='
              p-1
              border-0
              hover:opacity-70
              transition
              absolute
              left-9
              '
              >
                <IoMdClose size={18} />
              </button>
              <div className='text-lg font-semibold'>{title}</div>
            </div>
            <div className='p-6 relative flex-auto'>{body}</div>
            {/* footer */}
            <div className='p-6 flex flex-col gap-2'>
              <div className='flex flex-row gap-4 items-center w-full'>
                {secondaryAction && secondaryLabel && (
                  <Button
                    outline
                    onClick={handleSecondaryAction}
                    label={secondaryLabel}
                  />
                )}
                <Button onClick={handleOnSubmit} label={actionLabel} />{" "}
              </div>
              {footer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
