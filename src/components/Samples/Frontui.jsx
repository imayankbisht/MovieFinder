import React from "react";
import { GlobalContext } from "../../context/globalContext";

const Frontui = () => {
  let Global = React.useContext(GlobalContext);

  const { theme } = Global;

  let Background = "";
  if (theme) {
    Background = "bg-dark text-white";
  } else {
    Background = "bg-light text-dark";
  }
  return (
    <div
      style={{ height: "92vh", color: "white" }}
      className={`${Background} w-100 d-flex justify-content-center align-items-center`}
    >
      <p>Type something to see search results</p>
    </div>
  );
};

export default Frontui;
