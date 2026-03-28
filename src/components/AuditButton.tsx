import React from "react";

const AuditButton = ({
  onClickFunction,
  buttonState,
}: {
  onClickFunction: () => void;
  buttonState: boolean | undefined;
}) => {
  return (
    <button
      onClick={() => onClickFunction()}
      className={`text-xs w-fit ${
        !buttonState
          ? "bg-green-500 hover:bg-green-500/70 "
          : "bg-red-500 hover:bg-red-500/70 "
      } px-3 py-2 rounded-md cursor-pointer hover:scale-102 shadow-xs hover:shadow-black/30 active:shadow-black/10 active:scale-95 transition-all duration-300`}
    >
      {buttonState ? "Deactivate Audit Check" : "Activate Audit Check"}
    </button>
  );
};

export default AuditButton;
