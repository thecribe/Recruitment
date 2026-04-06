"use client";
import React, { createContext, useContext, useState } from "react";
import { MdClose } from "react-icons/md";

const ModalContext = createContext<any | undefined>(undefined);

const ModalWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalWrapper;

export const ModalTrigger = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const modalcontext = useContext(ModalContext);

  const { setIsOpen } = modalcontext;
  return (
    <div
      className={`${className ? className : "w-fit"} h-full`}
      onClick={() => setIsOpen(true)}
    >
      {children}
    </div>
  );
};

export const ModalContent = ({
  children,
  className,
  title,
}: {
  children: React.ReactNode;
  className: string;
  title?: any;
}) => {
  const modalcontext = useContext(ModalContext);
  const { isOpen, setIsOpen } = modalcontext;
  return (
    <>
      {isOpen && (
        <div className="fixed left-0 top-0 w-screen h-screen bg-black/50 flex justify-center items-center z-50">
          <div
            className={`bg-white rounded-md shadow-md p-5 ${className} flex flex-col gap-5 overflow-y-auto`}
          >
            <div
              className={`flex ${
                title ? "justify-between" : "justify-end"
              } items-center w-full cursor-pointer border-b-2 border-gray-400 pb-2`}
            >
              {title && title}
              <MdClose
                className="text-black text-4xl self-end"
                onClick={() => setIsOpen(false)}
              />
            </div>

            {children}
          </div>
        </div>
      )}
    </>
  );
};
