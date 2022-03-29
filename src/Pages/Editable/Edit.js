import React, { useContext, useEffect, useState } from "react";
import EditableList from "../../Components/Edit/EditableList";
// import { Layout } from "../../utilitis/Layout";
import AuthContext from "../../Context/Context";
import { ReactComponent as EditIcon } from "../../Assests/pencil.svg";

const Edit = () => {
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

  const Nosections= ()=>{
    return (
      <div
      className="p-2 m-3"
      style={{ boxShadow: "0px 3px 6px #00000036", borderRadius: "5rem" }}
    >
      <h2 className="text-center">Add Sections to edit</h2>
      <div className="d-flex justify-content-center">
        <lottie-player
          src="https://assets1.lottiefiles.com/packages/lf20_4hlbkvut.json"
          background="transparent"
          speed="1"
          style={{ width: "500px", height: "500px", transform: "scale(1.5 )" }}
          loop
          autoplay
        ></lottie-player>
      </div>
    </div>
    )
  }
  return (
    <>
      {ctx.layoutFlow?.length === 0 ? <Nosections/> : <></>}
      <div className="row">
        <div className="all-section-list col-2 p-0">
          {ctx.layoutFlow &&
            ctx.layoutFlow.map((item, index) => (
              <div
                className="row align-items-center  bg-light border-white justify-content-center p-2"
                key={index}
                onClick={() => onMount(index)}
                style={{
                  border: "0.35rem solid",
                  borderBottom: "0",
                  cursor: "pointer",
                }}
              >
                <span
                  //   className="text-primary"
                  style={{ marginRight: "5px", width: "45%" }}
                >
                  {rename(item.uniqId, index)}
                </span>
                <EditIcon style={{ width: "7%" }} />
              </div>
            ))}
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
