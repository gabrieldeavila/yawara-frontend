import React from "react";
import { VscLoading } from "react-icons/vsc";

const Loading = () => {
  return (
    <div className="loading">
      <div className="loading-wrapper">
        <VscLoading />
      </div>
    </div>
  );
};

export default Loading;
