"use client";

import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  FloatingFocusManager,
} from "@floating-ui/react";

type DropdownContextType = {
  isOpen: boolean;
  refs: ReturnType<typeof useFloating>["refs"];
  floatingStyles: React.CSSProperties;
  getReferenceProps: (userProps?: any) => any;
  getFloatingProps: (userProps?: any) => any;
  context: ReturnType<typeof useFloating>["context"];
};

const DropdownContext = createContext<DropdownContextType | undefined>(
  undefined,
);

export function Dropdown({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "bottom-end", // matches your original "right" alignment
    middleware: [
      offset(8), // small gap like your mt-2
      flip({
        fallbackPlacements: ["top-end", "top-start", "bottom-start"],
      }),
      shift({ padding: 8 }), // prevents overflow
    ],
    whileElementsMounted: autoUpdate, // updates on scroll/resize
  });

  const click = useClick(context);
  const dismiss = useDismiss(context, {
    outsidePress: true,
    escapeKey: true,
  });
  const role = useRole(context, { role: "menu" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const value = useMemo(
    () => ({
      isOpen,
      refs,
      floatingStyles,
      getReferenceProps,
      getFloatingProps,
      context,
    }),
    [
      isOpen,
      refs,
      floatingStyles,
      getReferenceProps,
      getFloatingProps,
      context,
    ],
  );

  return (
    <DropdownContext.Provider value={value}>
      {children}
    </DropdownContext.Provider>
  );
}

export const DropdownTrigger = ({
  children,
  ...props
}: {
  children: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("DropdownTrigger must be used inside <Dropdown>");
  }

  const { refs, getReferenceProps } = context;

  return (
    <div
      ref={refs.setReference}
      {...getReferenceProps(props)}
      className="flex items-center gap-3 cursor-pointer py-4 px-3 rounded-xl hover:bg-gray-100 active:bg-gray-200 transition-all"
    >
      {children}
    </div>
  );
};

export const DropdownContent = ({ children }: { children: ReactNode }) => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("DropdownContent must be used inside <Dropdown>");
  }

  const {
    isOpen,
    refs,
    floatingStyles,
    getFloatingProps,
    context: floatingContext,
  } = context;

  if (!isOpen) return null;

  return (
    <FloatingPortal>
      <FloatingFocusManager context={floatingContext} modal={false}>
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className="w-56 bg-white rounded-2xl shadow-2xl  py-2 z-50"
        >
          {children}
        </div>
      </FloatingFocusManager>
    </FloatingPortal>
  );
};
