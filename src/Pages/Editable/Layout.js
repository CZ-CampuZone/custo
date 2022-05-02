import React, { useContext, useState, useEffect } from "react";
import DraggableList from "../../Components/Layout/DraggableList";
import Preview from "../../Components/Layout/Preview";
import AuthContext from "../../Context/Context";

const Layout = () => {
  const ctx = useContext(AuthContext);

  useEffect(() => {
    ctx.updateIsEditable(false);
  }, []);
  return (
    <>
      <div className="row">
        <DraggableList />
        <Preview />
      </div>
    </>
  );
};

export default Layout;
