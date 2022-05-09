import React, { useContext, useState } from "react";

import AuthContext from "../../../Context/Context";
import Loader from "../../../loader/Loader";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import clsx from "clsx";
import { createStyles, makeStyles } from "@mui/styles";
import { Update } from "../../../loader/Update";
import { ReactComponent as DeleteIcon } from "../../../Assests/delete.svg";
const useStyles = makeStyles(() =>
  createStyles({
    testiMonials: {
      padding: "100px 0",
    },
    testCard: {
      borderBottom: "3px #edb40b solid !important",
      transition: "0.5s",
      marginTop: "60px",
    },
    testIcon: {
      backgroundColor: "#edb40b",
      color: "#ffffff",
      width: "75px",
      height: "75px",
      lineHeight: "75px",
      margin: "-40px auto 0 auto",
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
    editablePara:{
      width: "100%",
      background: "transparent",
      outline: 0,
      border: "none",
      textAlign: "center",

    },
    editableName:{
      
      background: "transparent",
      outline: 0,
      border: "none", 
    }
    
  })
);
const Slider1 = (props) => {
  const classes = useStyles();
  const [updatestatus, setUpdatestatus] = useState(false);
  const [loading, setloading] = useState(false);
  const ctx = useContext(AuthContext);
  const cardData = {
    header: "What Our Families are Saying",
    data: [
      {
        para: "It is a long established fact that a reader will be distracted by the readable",
        name: "Mohamed Nady",
        id: 0,
      },
      {
        para: "It is a long established fact that a reader will be distracted by the readable",
        name: "Mohamed Nady",
        id: 1,
      },
      {
        para: "It is a long established fact that a reader will be distracted by the readable",
        name: "Mohamed Nady",
        id: 2,
      },
    ],
  };
  const [localData, setLocalData] = useState(
    ctx.websiteData[props.id] === undefined
      ? cardData
      : ctx.websiteData[props.id]
  );
  const [card, setCard] = useState(localData.data);
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
      para: "It is a long established fact that a reader will be distracted by the readable",
      name: "Mohamed Nady",
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
    let editable = (
      <>
        {updatestatus === true && <Update />}

        {card.map((details, index) => (
            <div class="col-md-6 col-lg-4" key={index}>
            <div
              className={clsx(
                classes.testCard,
                " border-light bg-light position-relative text-center"
              )}
            >
              <i
                class={clsx(
                  classes.testIcon,
                  "fa fa-quote-left fa-3x card-img-top rounded-circle"
                )}
                aria-hidden="true"
              ></i>
          <div class="card-body blockquote " >
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
            <p class="card-text">
              <textarea
              rows={3}
                onChange={(e) => onChangeHandler(e, details, index)}
                className={classes.editablePara}
                id="para"
                name="para"
                placeholder="para"
                value={details.para}
              />
            </p>
            <div className="text-center">
            <footer class="blockquote-footer ">
              <cite title="Source Title">
                {" "}
                <input
                  onChange={(e) => onChangeHandler(e, details, index)}
                  className={classes.editableName}
                  id="name"
                  name="name"
                  placeholder="name"
                  value={details.name}
                />
              </cite>
            </footer>
            </div>
          </div>
          </div>
          </div>
        ))}
        <div className={classes.addCard} onClick={addCard}>
          <i class="fa fa-plus-circle mx-2" aria-hidden="true"></i> Add Card
        </div>
      </>
    );


  return (
    <>
      {ctx.isEditable ? (
        <div className="row py-3 justify-content-end">
          <button
            className="btn px-5"
            onClick={onSaveHandler}
            style={{
              background: "#fff",
              fontSize: "20px",
              color: "#dc3545",
              borderRadius: "20px",
              boxShadow: "0 3px 6px #00000036",
            }}
          >
            Save<i className="fa fa-save mx-2"></i>{" "}
          </button>
        </div>
      ) : (
        <></>
      )}
      {loading && (
        <>
          <Loader />
        </>
      )}
      <div class={clsx(classes.testiMonials, " text-center")}>
        <div class="container position-relative">
          <h2 className=" mb-5">Testimonials</h2>
          <div class="row">
             {ctx.isEditable ? (
                    editable
                  ) : (
                    <>
            {card.map((data, index) => (
              <div class="col-md-6 col-lg-4" key={index}>
                <div
                  className={clsx(
                    classes.testCard,
                    " border-light bg-light text-center"
                  )}
                >
                  <i
                    class={clsx(
                      classes.testIcon,
                      "fa fa-quote-left fa-3x card-img-top rounded-circle"
                    )}
                    aria-hidden="true"
                  ></i>
                 
                    <div class="card-body blockquote">
                      <p class="card-text">{data.para}</p>
                      <footer class="blockquote-footer">
                        <cite title="Source Title">{data.name}</cite>
                      </footer>
                    </div>
                   
                </div>
              </div>
            ))}
             </>)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Slider1;
