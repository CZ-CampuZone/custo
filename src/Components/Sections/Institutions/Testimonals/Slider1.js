import React, { useContext, useState } from "react";
import styles from "./Slider1.module.css";
import AuthContext from "../../../Context/Context";
import Loader from "../../../loader/Loader";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import clsx from "clsx";
import { Update } from "../../../loader/Update";

import { ReactComponent as DeleteIcon } from "../../../Assests/delete.svg";

const Slider1 = (props) => {
  const [loading, setloading] = useState(false);
  const [updatestatus, setUpdatestatus] = useState(false);
  const ctx = useContext(AuthContext);
  const cardData = {
    header: "What Our Families are Saying",
    data: [
      {
        para: "It is a long established fact that a reader will be distracted by the readable",
        id: 0,
      },
      {
        para: "It is a long established fact that a reader will be distracted by the readable",
        id: 1,
      },
      {
        para: "It is a long established fact that a reader will be distracted by the readable",
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
  const options = {
    loop: false,
    margin: 50,
    dots: true,
    nav: true,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplaySpeed: 2000,
    autoplayHoverPause: true,
    items: 1,
  };

  const onChangeHandler = (e, details, index) => {
    setCard((prevState) => {
      let updatedData = null;
      if (e.target.id === "heading") {
        updatedData = {
          ...details,
          heading: e.target.value,
        };
      } else {
        updatedData = {
          ...details,
          content: e.target.value,
        };
      }
      prevState[index] = updatedData;
      return [...prevState];
    });
  };
  const addCard = () => {
    let updatedData = {
      para: "It is a long established fact that a reader will be distracted by the readable",
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
      setUpdatestatus(true)
    }, 2000).then(
      setTimeout(() => {

        setUpdatestatus(false)
      }, 4000)
    )
  };

  return (
    <>
      {ctx.isEditable ? (
        <>
        {updatestatus === true && <Update />}
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
        </>
      ) : (
        <></>
      )}
      {loading && (
        <>
          <Loader />
        </>
      )}
      <section>
        <div
          className={clsx(
            ctx.isEditable
              ? "h-100 col-md-9 col-lg-7 m-auto"
              : "col-md-9 col-lg-7 m-auto",
            styles.test
          )}
        >
          {ctx.isEditable ? (
            <div className="text-center ">
              <input
                className={clsx(styles.test_text_h2, styles.inputHeader)}
                placeholder="Header"
                id="header"
                onChange={onChange}
                value={localData.header}
              />
              <div className="d-flex justify-content-center mb-5">
              <div className={styles.addCard} onClick={addCard}>
                <i class="fa fa-plus-circle mx-2" aria-hidden="true"></i> Add Card
              </div>
              </div>
              {card.map((details, index) => (
                <div
                  className="row position-relative justify-content-center align-items-center mb-2"
                  key={index}
                > <div
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
                  <h5 className="pr-4">{"Slider " + `${index + 1}`}</h5>
                  <textarea
                    key={index}
                    onChange={(e) => onChangeHandler(e, details, index)}
                    className={styles.inputPara}
                    id="para"
                    name="para"
                    style={{ width: "75%" }}
                    defaultValue={details.para}
                  >
                  </textarea>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <h2 className={styles.test_text_h2}>{localData.header}</h2>
              <OwlCarousel className="owl-theme" {...options}>
                {card.map((details, index) => (
                  <p key={index}>{details.para}</p>
                ))}
              </OwlCarousel>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Slider1;
