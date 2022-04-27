import React, { useCallback, useContext, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AuthContext from "../../Context/Context";
import { db } from "../../services/firebase";
import { doc, updateDoc } from "firebase/firestore";
import Loader from "../../loader/Loader";
import { NavLink } from "react-router-dom";
import { useDrop } from "react-dnd";
import clsx from"clsx"
import WebFont from "webfontloader";
import { ReactComponent as DeleteIcon } from "../../Assests/delete.svg";

const Preview = () => {
  const ctx = useContext(AuthContext);
  const [mountedData, setMountedData] = useState([]);
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
    setTimeout(() => {
      setloading(false);
    }, 2000);
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
            src="https://assets1.lottiefiles.com/packages/lf20_4hlbkvut.json"
            background="transparent"
            speed="1"
            style={{ width: "500px", height: "500px", transform: "scale(1.8)", fontfamily:"raleway" }}
            loop
            autoplay
          ></lottie-player>
        </div>
      </div>
    );
  };
  return (
    <>
      {loading && (
        <>
          <Loader />
        </>
      )}
      <div
        className="col-10 p-2 special-scroll"
        style={{ height: "91vh", overflowX: "hidden", overflowY: "auto" }}
      >
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <div className="row px-4  pt-2 pb-4 justify-content-between">
          

            <NavLink to="/" target="_blank">
              <button
                className="btn shadow px-3  "
                style={{
                  background: "#fff",
                  color: "#dc3545",
                  borderRadius: "20px",
                  boxShadow: "0 3px 6px #00000036",
                }}
              >
                Fullpage View<i className="fa fa-eye mx-2"></i>
              </button>
            </NavLink>
            <button
              className="btn px-5"
              onClick={onSaveHandler}
              style={{
                background: "#fff",
                color: "#dc3545",
                borderRadius: "20px",
                boxShadow: "0 3px 6px #00000036",
              }}
            >
              Save<i className="fa fa-save mx-2"></i>{" "}
            </button>
          </div>
          <Droppable droppableId="mounted">
            {(provided) => (
              <div
                className="mounted px-4"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <div
                  className={clsx(ctx.layoutFlow?.length > 0 ? "border" : "")}
                  ref={drop}
                  style={{ zoom: "0.6" }}
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
                          <div
                            onClick={() => deleteHandler(item.uniqId)}
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
