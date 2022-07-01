import React, { useContext, useEffect, useState } from "react";
import EditableList from "../../Components/Edit/EditableList";
import AuthContext from "../../Context/Context";
import { createStyles, makeStyles } from "@mui/styles";
import WebFont from "webfontloader";
import clsx from "clsx";
import { ReactComponent as EditIcon } from "../../Assests/pencil.svg";
const useStyles = makeStyles(() =>
  createStyles({
    editBox: {
      color: "#6a6363",
      margin: "10px 0px",
      position: "relative",
      height: "45px",

      borderRadius: "10px",
      cursor: "pointer",
      boxShadow: "10px 10px 15px rgba(0, 0, 0, 0.025)",
      "& .editIcon": {
        display: "inline",
        margin: "0px 10px",
      },
      "&:focus": {
        outline: "0",
        boxShadow: "none",
      },
    },
  })
);
const Edit = () => {
  const classes = useStyles();
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Raleway"],
      },
    });
  }, []);
  const ctx = useContext(AuthContext);
  const [active, setActive] = useState();
  const [mountedComponent, setMountedComponent] = useState([]);
  useEffect(() => {
    ctx.updateIsEditable(true);
  }, []);
  if (
    ctx.layoutFlow &&
    mountedComponent.length === 0 &&
    ctx.layoutFlow.length > 0
  ) {
    mountedComponent.push(ctx.layoutFlow[0]);
  }
  const onMount = (id) => {
    setMountedComponent((prevState) => {
      prevState = [];
      return [...prevState, ctx.layoutFlow[id]];
    });
  };
  const CreateComponent = ({ component, id }) => {
    const Component = component;
    return <Component id={id} />;
  };
  const rename = (name, i) => {
    let firstName = name.substring(0, name.length - 2);
    let lastName = name.charAt(name.length - 1);
    let newName = firstName + " " + lastName;
    return newName;
  };

  const Nosections = () => {
    return (
      <div
        className="p-2 mx-3 col-md-10 mt-5  m-auto"
        style={{
          boxShadow: "0px 3px 6px #00000036",
          borderRadius: "5rem",
          fontFamily: "raleway",
        }}
      >
        <h5 className="text-center font-weight-bold">Add Sections to edit</h5>
        <div className="d-flex justify-content-center">
          <lottie-player
            src="https://assets6.lottiefiles.com/packages/lf20_pgeevipp.json"
            background="transparent"
            speed="1"
            style={{
              width: "500px",
              height: "300px",
              transform: "scale(1.9 )",
            }}
            loop
            autoplay
          ></lottie-player>
        </div>
      </div>
    );
  };
  return (
    <>
      {ctx.layoutFlow?.length === 0 ? <Nosections /> : <></>}
      <div className="row m-0">
        <div className="all-section-list col-2  m-0 p-0">
          <div class="Editlist">
            {ctx.layoutFlow &&
              ctx.layoutFlow.map((item, index) => (
                <button
                  class={clsx(classes.editBox, "btn")}
                  style={{
                    borderRadius: "0",
                    borderTopLeftRadius: "5px",
                    borderBottomLeftRadius: "5px",
                    background: active === index ? "#9e3a8ccc" : "white",
                    color: active === index ? "white" : "#777",
                    fill: active === index ? "white" : "#777",
                  }}
                  key={index}
                  onClick={() => {
                    onMount(index);
                    setActive(index);
                  }}
                >
                  <EditIcon className="editIcon" style={{ width: "7%" }} />
                  <h6 className="  d-inline mx-2">
                    {rename(item.uniqId, index)}
                  </h6>
                </button>
              ))}
          </div>
        </div>

        {/* <EditableList /> */}
        <div
          className="col-10 p-2 special-scroll"
          style={{
            height: "91vh",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {mountedComponent.map((single) => (
            <div key={single.uniqId} style={{ zoom: "0.7" }}>
              <CreateComponent component={single.c} id={single.uniqId} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Edit;
