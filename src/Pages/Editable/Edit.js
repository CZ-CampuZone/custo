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
      background: "",
      "&:focus": {
        background: "linear-gradient(79deg, rgba(255, 58, 58, 1) 0%, rgba(247, 247, 247, 1) 100%,rgba(242, 235, 234, 1) 100%)",
        color: "white",
        outline: "0"
      },
    }
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
        className="p-2 mx-3 w-50 m-auto"
        style={{ boxShadow: "0px 3px 6px #00000036", borderRadius: "5rem", fontFamily: "raleway" }}
      >
        <h2 className="text-center">Add Sections to edit</h2>
        <div className="d-flex justify-content-center">
          <lottie-player
            src="https://assets1.lottiefiles.com/packages/lf20_4hlbkvut.json"
            background="transparent"
            speed="1"
            style={{ width: "500px", height: "500px", transform: "scale(1.0 )" }}
            loop
            autoplay
          ></lottie-player>
        </div>
      </div>
    )
  }
  return (
    <>
      {ctx.layoutFlow?.length === 0 ? <Nosections /> : <></>}
      <div className="row">
        <div className="all-section-list col-2 p-0">

          <div class="Editlist">
            {ctx.layoutFlow &&
              ctx.layoutFlow.map((item, index) => (
                // <button
                //   className={clsx(classes.editBox ,"row align-items-center edit-box border-white justify-content-center p-2")}
                //   key={index}
                //   onClick={() => onMount(index)}
                //   style={{
                //     border: "0.35rem solid",
                //     borderBottom: "0",
                //     cursor: "pointer",
                //   }}
                // >
                //   <span
                //     //   className="text-primary"
                //     style={{ marginRight: "5px", width: "45%" }}
                //   >
                //     {rename(item.uniqId, index)}
                //   </span>
                //   <EditIcon style={{ width: "7%" }} />
                // </button>

                <div class="box" key={index}
                  onClick={() => onMount(index)} >
                  <div class="content">

                    <div class="text pt-2">
                      <EditIcon className="d-inline mx-2 edit-icon" style={{ width: "4%" }} />
                      <h6 className="  d-inline mx-2">{rename(item.uniqId, index)}</h6>

                    </div>
                  </div>
                </div>


              ))}
          </div>
        </div>

        {/* <EditableList /> */}
        <div className="col-10 p-3">
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
