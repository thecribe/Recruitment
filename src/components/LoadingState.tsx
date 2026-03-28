import React from "react";

const LoadingState = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <span className="loader"></span>
    </div>
  );
};

export default LoadingState;
