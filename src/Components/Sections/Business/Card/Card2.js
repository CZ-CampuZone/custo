import React, { useContext, useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import AuthContext from "../../../Context/Context";
import { ReactComponent as DeleteIcon } from "../../../Assests/delete.svg";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Update } from "../../../loader/Update";
import Loader from "../../../loader/Loader";
import clsx from "clsx";

const useStyles = makeStyles(() =>
  createStyles({
    cardBox: {
      background: "#f4f4f4",
      "&:hover": {
        background: "white",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      },
    },
    editable: {
      width: "100%",
      background: "transparent",
      outline: 0,
      border: "none",
      textAlign: "center",
    },
    introHeader:{
      
      background: "transparent",
      outline: 0,
      border: "none",
      fontSize: "1.75rem !important",
      color: "#000",
    },
    addCard: {
      borderRadius: "1rem",
      position: "absolute",
      background: "#fff",
      padding: "1rem 2rem",
      top: "1rem",
      color: "#9e3a8ccc",
      cursor: "pointer",
      right: "1rem",
      boxShadow: "2px 2px 3px 0 #ccc",
    },
  })
);
export const Card2 = (props) => {
  const classes = useStyles();
  const ctx = useContext(AuthContext);
  const cardData = {
    header: "Browse by category",
    data: [
      {
        title: "Food & Choclates",
        id: "0",
      },
      {
        title: "Food & Choclates",

        id: "1",
      },
      {
        title: "Food & Choclates",

        id: "2",
      },
    ],
  };
  const [localData, setLocalData] = useState(cardData);
  const [loading, setloading] = useState(false);
  const [updatestatus, setUpdatestatus] = useState(false);
  const [card, setCard] = useState(localData.data);
  const options = {
    loop: true,
    margin: 30,
    dots: false,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplaySpeed: 2000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 2,
      },
      450: {
        items: 3,
      },
      750: {
        items: 5,
      },
      1200: {
        items: 8,
      },
    },
  };
  const onChange = (event) => {
    let val = event.target.value;
    setLocalData((prevState) => {
      return {
        ...prevState,
        [event.target.id]: val,
      };
    });
  };
  const onChangeHandler = (e, details, index) => {
    const tempEventInputs = JSON.parse(JSON.stringify(details));
    if (e.target) {
      tempEventInputs[e.target.id] = e.target.value;
    }
    setCard((prevState) => {
      prevState[index] = tempEventInputs;
      return [...prevState];
    });
  };
  
  const addCard = () => {
    let updatedData = {
      title: "",
      id: card.length,
    };
    setCard((prevState) => {
      return [...prevState, updatedData];
    });
  };
  const removeCard = (value) => {
    setCard((prevState) => {
      prevState = prevState.filter((item) => item.id !== value);
      return [...prevState];
    });
  };
  let editable = (
    <div className=" position-relative ">
    <div className=" position-relative mt-4 py-2">
      {updatestatus === true && <Update />}
      <input
        style={{ display: "inline" }}
        className={classes.introHeader}
        placeholder="Header"
        id="header"
        onChange={onChange}
        value={localData.header}
      />
      <span style={{ color: "#9797a5" }} className="d-inline">
        All categories {">"}
      </span>
      <div className="mt-2 row p-2">
        {card.map((details, index) => (
          <div
            key={index}
            className={clsx(
              classes.cardBox,
              " rounded text-center col-md-2 pt-4 pb-2 position-relative"
            )}
          >
            <div
              onClick={() => removeCard(details.id)}
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

            <i
              style={{ fontSize: "50px", color: "#edb40b" }}
              class="fas fa-store-slash"
            ></i>
            <input
              onChange={(e) => onChangeHandler(e, details, index)}
              className={classes.editable}
              id="title"
              placeholder="title"
              value={details.title}
            />
          </div>
        ))}
      </div>
    
    </div>
    <div className={classes.addCard} onClick={addCard}>
        <i class="fa fa-plus-circle mx-2" aria-hidden="true"></i> Add Card
      </div>
    </div>
  );
  const onSaveHandler = () => {
    setloading(true);
    let data = {
      header: localData.header,
      data: card,
    };

    ctx.updateData(data, props.id);
    setTimeout(() => {
      setloading(false);
      setUpdatestatus(true);
    }, 2000).then(
      setTimeout(() => {
        setUpdatestatus(false);
      }, 4000)
    );
  };
  return (
    <>
      {ctx.isEditable ? (
        <div className="row py-3 justify-content-end">
          <div className="row py-3 justify-content-end">
            <button
              className="btn px-5"
              onClick={onSaveHandler}
              style={{
                background: "#9e3a8ccc",
                fontSize: "20px",
                color: "#fff",
                borderRadius: "20px",
                boxShadow: "0 3px 6px #00000036",
              }}
            >
              Save<i className="fa fa-save mx-2"></i>{" "}
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
      {loading && (
        <>
          <Loader />
        </>
      )}
      {ctx.isEditable ? (
        editable
      ) : (
        <div className=" mt-4 py-2">
          <h4 className="d-inline mb-2 mr-4">{localData.header}</h4>{" "}
          <span style={{ color: "#9797a5" }} className="d-inline">
            All categories {">"}
          </span>
          <OwlCarousel className="owl-theme mt-2 p-2 " {...options}>
            {card.map((item, index) => (
              <div
                key={index}
                className={clsx(
                  classes.cardBox,
                  " rounded text-center pt-4 pb-2  "
                )}
              >
                <i
                  style={{ fontSize: "50px", color: "#edb40b" }}
                  class="fas fa-store-slash"
                ></i>
                <h6 className="mt-2 ">{item.title}</h6>
              </div>
            ))}
          </OwlCarousel>
        </div>
      )}
    </>
  );
};
