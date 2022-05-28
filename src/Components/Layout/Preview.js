import React, { useCallback, useContext, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AuthContext from "../../Context/Context";
import { db } from "../../services/firebase";
import { doc, updateDoc } from "firebase/firestore";
import Loader from "../../loader/Loader";
import { NavLink } from "react-router-dom";
import { useDrop } from "react-dnd";
import clsx from "clsx";
import WebFont from "webfontloader";
import { ReactComponent as DeleteIcon } from "../../Assests/delete.svg";
import { Update } from "../../loader/Update";
import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles(() =>
  createStyles({
    modalBox: {
      position: "fixed",
      left: "0",
      right: "0",
      top: "0",
      bottom: "0",
      width: "35%",
      margin: "auto",
      height: "fit-content",
      zIndex: "9999",
    },
    backDrop: {
      position: "fixed",
      left: "0",
      right: "0",
      top: "0",
      bottom: "0",
      height: "170vh",
      width: "100%",
      background: " rgba(0, 0, 0, 0.5)",
      zIndex: "9999",
    },
  })
);
const Preview = () => {
  const classes = useStyles();
  const ctx = useContext(AuthContext);
  const [mountedData, setMountedData] = useState([]);
  const [updatestatus, setUpdatestatus] = useState(false);
  const [modalstate, setModalstate] = useState(false);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    setMountedData(ctx.layoutFlow ? ctx.layoutFlow : []);
  }, [mountedData]);
  const [{ isOver }, drop] = useDrop({
    accept: "Object",
    drop: (item, monitor) => {
      setMountedData((prevState) => {
        return [...prevState, item];
      });
      ctx.addLayout(item);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  const handleOnDragEnd = (movedItem) => {
    const newArr = Array.from(mountedData);
    const [reorderedItem] = newArr.splice(movedItem.source.index, 1);
    newArr.splice(movedItem.destination.index, 0, reorderedItem);
    setMountedData(newArr);
    ctx.updateLayout(newArr);
  };
  const CreateComponent = ({ component, id }) => {
    const Component = component;
    return <Component id={id} />;
  };
  const deleteHandler = (id) => {
    console.log(id, "delete");
    setMountedData((prevState) => {
      prevState = prevState.filter((item) => item.uniqId !== id);
      ctx.updateLayout(prevState);
      return [...prevState];
    });
    ctx.deleteData(id);
    setModalstate(false)
  };
  const onSaveHandler = () => {
    setloading(true);
    ctx.updateLayout(mountedData);

    var tempArr = [];
    for (var i = 0; i < mountedData.length; i++) {
      let newData = {
        id: mountedData[i].id,
        uniqId: mountedData[i].uniqId,
      };
      tempArr = tempArr.concat(newData);
    }
    updateDoc(doc(db, "layout", ctx.userId), { layout: tempArr });
    // upadte in db
    updateDoc(doc(db, "websitedata", ctx.userId), {
      websiteData: ctx.websiteData,
    });
    setTimeout(() => {
      setloading(false);
      setUpdatestatus(true);
    }, 2000).then(
      setTimeout(() => {
        setUpdatestatus(false);
      }, 4000)
    );
  };
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Raleway"],
      },
    });
  }, []);
  const NoLayout = () => {
    return (
      <div
        className="p-4"
        style={{ boxShadow: "0px 3px 6px #00000036", borderRadius: "5rem" }}
      >
        <h2 className="text-center">Drag and Drop Here</h2>
        <div className="d-flex justify-content-center">
          <lottie-player
            src="https://assets6.lottiefiles.com/packages/lf20_pgeevipp.json"
            background="transparent"
            speed="1"
            style={{
              width: "500px",
              height: "500px",
              transform: "scale(1.8)",
              fontfamily: "raleway",
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
      {updatestatus === true && (
        <div style={{ zoom: "0.7" }}>
          {" "}
          <Update />
        </div>
      )}
      {loading && (
        <>
          <Loader />
        </>
      )}
      <div
        className="col-10 m-0 pt-4 p-2 special-scroll"
        style={{ height: "91vh", overflowX: "hidden", overflowY: "auto" }}
      >
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <div className="row px-4  pt-2 pb-4 justify-content-between">
            <NavLink to="/" target="_blank">
              <button
                className="btn  px-5 py-1"
                style={{
                  zoom: "0.8",
                  background: "#9e3a8ccc",
                  color: "#fff",
                  borderRadius: "20px",
                  boxShadow: "0 3px 6px #00000036",
                }}
              >
                Preview<i className="fa fa-eye mx-2"></i>
              </button>
            </NavLink>
            <button
              className="btn px-5 py-1"
              onClick={onSaveHandler}
              style={{
                zoom: "0.8",
                background: "#9e3a8ccc",
                color: "#fff",
                borderRadius: "20px",
                boxShadow: "0 3px 6px #00000036",
              }}
            >
              Save<i className="fa fa-save mx-2"></i>{" "}
            </button>
          </div>
          <Droppable droppableId="mounted">
            {(provided, snapshot) => (
              <div
                className="mounted px-4"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <div
                  className="p-2"
                  ref={drop}
                  style={{
                    zoom: "0.6",
                    border:
                      ctx.layoutFlow?.length > 0 ? "1px solid #9e3a8ccc" : "",
                  }}
                >
                  {ctx.layoutFlow?.length === 0 ? <NoLayout /> : <></>}
                  {mountedData.map((item, index) => (
                    <Draggable
                      key={item.uniqId}
                      draggableId={item.uniqId}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="position-relative"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {modalstate && (
                            <div className={classes.backDrop}>
                              <div
                                className={clsx(
                                  classes.modalBox,
                                  "px-2 text-center rounded bg-white py-5"
                                )}
                              >
                                <h3 className="p-3 m-4">
                                  Are you sure want to delete the component
                                </h3>
                                <button
                                  style={{
                                    background: "#9e3a8ccc",
                                    color: "#fff",
                                    borderRadius: "20px",
                                    boxShadow: "0 3px 6px #00000036",
                                    transform:"scale(1.4)"
                                  }}
                                  className="btn mx-5 px-5 py-1"
                                   onClick={() => deleteHandler(item.uniqId)
                                  }
                                >
                                  Yes{" "}
                                </button>
                                <button
                                  style={{
                                    background: "#9e3a8ccc",
                                    color: "#fff",
                                    borderRadius: "20px",
                                    boxShadow: "0 3px 6px #00000036",
                                    transform:"scale(1.4)"
                                  }}
                                  className="btn mx-5 px-5 py-1"
                                  onClick={() => setModalstate(false)}
                                >
                                  No{" "}
                                </button>
                              </div>
                            </div>
                          )}
                          <div
                            onClick={() => setModalstate(true)}
                           
                            style={{
                              position: "absolute",
                              top: "0",
                              left: "0",
                              zIndex: 20,
                              cursor: "pointer",
                            }}
                          >
                            <DeleteIcon
                              style={{
                                width: "2rem",
                                height: "2rem",
                                fill: "#dc3545",
                                padding: "5px",
                              }}
                            />
                          </div>

                          <CreateComponent
                            component={item.c}
                            id={item.uniqId}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
};

export default Preview;
