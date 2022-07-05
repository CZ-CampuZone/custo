import React from "react";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../Context/Context";
import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles(() =>
  createStyles({
    scrollbar: {
      maxHeight: "100vh",
      overflowX: "hidden",
      overflowY: "auto",
      scrollBehavior: "smooth",
      "&::-webkit-scrollbar": {
        width: "5px",
      },
      "&::-webkit-scrollbar-thumb": {
        width: "5px",
        background: "#000",
      },
      "&::-webkit-scrollbar-track": {
        width: "5px",
        background: "#efefef",
        boxShadow: "inset 0px 3px 6px #00000036",
      },
    },
  })
);

const Home = () => {
  const classes = useStyles();
  const ctx = useContext(AuthContext);
  useEffect(() => {
    ctx.userLayoutData();
    ctx.userWebsiteData();
  }, []);
  console.log(ctx.layoutFlow);

  const CreateComponent = ({ component, id }) => {
    const Component = component;
    return <Component id={id} />;
  };
  return (
    <div className={classes.scrollbar}>
      {ctx.layoutFlow &&
        ctx.layoutFlow.map((item) => (
          <div key={item.uniqId} id={item.uniqId}>
            <CreateComponent component={item.c} id={item.uniqId} />
          </div>
        ))}
    </div>
  );
};

export default Home;
