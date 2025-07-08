import React from "react";

const Loading = (prop) => {
  return (
    <div>
      <span className={"loading loading-ring" + prop.size}></span>
    </div>
  );
};

export default Loading;
