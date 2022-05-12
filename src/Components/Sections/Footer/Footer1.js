import React, { useContext, useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import "owl.carousel/dist/assets/owl.carousel.css";
import AuthContext from "../../../Context/Context";
import Loader from "../../../loader/Loader";
import { Update } from "../../../loader/Update";
import clsx from "clsx";

const useStyles = makeStyles(() =>
  createStyles({
    editable: {
      textAlign: "left",
      color: "white",
      background: "transparent",
      outline: "0",
      border: "none",
    },

    paraText: {
      fontSize: "0.75rem",
      color: "#333",
      fontWeight: "200",
      padding: "0.75rem 0",
      textTransform: "capitalize",
      background: "transparent",
      outline: 0,
      border: "none",
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
    blockDark: {
      backgroundColor: "#0d151e",
    },
    Topcurvedbg: {
      height: "100px!important",
      backgroundImage:
        "url('https://keenthemes.com/images/misc/curve-dark-top-bg.png')",
    },

    // "@media (max-width: 600px)": {
    //   card: {
    //     width: "100%",
    //   },
    // },
  })
);
export const Footer1 = (props) => {
  const classes = useStyles();
  const [loading, setloading] = useState(false);
  const ctx = useContext(AuthContext);
  const cardData = {
    copyright: "www.supermarket.com",

    data: [
      {
        header: "Intro header 2",
        headline: "Fast Delivery",
        tagline: "For All the oders over 200",
        line1: "loerum",
        line2: "loerum",
        line3: "loerum",
        line4: "loerum",
        id: "0",
      },
      {
        header: "Intro header 2",
        headline: "Fast Delivery",
        tagline: "For All the oders over 200",
        line1: "loerum",
        line2: "loerum",
        line3: "loerum",
        line4: "loerum",
        id: "1",
      },
      {
        header: "Intro header 2",
        headline: "Fast Delivery",
        tagline: "For All the oders over 200",
        line1: "loerum",
        line2: "loerum",
        line3: "loerum",
        line4: "loerum",
        id: "2",
      },
      {
        header: "Intro header 2",
        headline: "Fast Delivery",
        tagline: "For All the oders over 200",
        line1: "loerum",
        line2: "loerum",
        line3: "loerum",
        line4: "loerum",
        id: "3",
      },
    ],
  };
  const [localData, setLocalData] = useState(
    ctx.websiteData[props.id] === undefined
      ? cardData
      : ctx.websiteData[props.id]
  );
  const [updatestatus, setUpdatestatus] = useState(false);
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
  let editable = (
    <>
      {updatestatus === true && <Update />}
   
     
    
      <div class="container mt-n15">
        <div class="row">
          {card.map((details, index) => (
            <div key={index} class="col-md-3">
              <div className="py-2">
                <i
                  style={{
                    fontSize: "25px ",
                    padding: "5px",
                    background: "#ffc107",
                    borderRadius: "50px",
                    color: "#0d151e",
                  }}
                  class="fa fa-car mx-1  d-inline fa-lg"
                ></i>
                <input
                  className={clsx("d-inline text-white", classes.editable)}
                  placeholder="headline"
                  id="headline"
                  onChange={(e) => onChangeHandler(e, details, index)}
                  value={details.headline}
                />
                <input
                  className={clsx(" text-white", classes.editable)}
                  placeholder="tagline"
                  id="tagline"
                  onChange={(e) => onChangeHandler(e, details, index)}
                  value={details.tagline}
                />
              </div>
              <div class="pb-10">
                <input
                  style={{ color: "#ffc107" }}
                  className={clsx("mb-2 mb-lg-7 font-size-3", classes.editable)}
                  placeholder="Header"
                  id="header"
                  onChange={(e) => onChangeHandler(e, details, index)}
                  value={details.header}
                />

                <div class="d-flex flex-column font-size-2 font-weight-bold">
                  <input
                    onChange={(e) => onChangeHandler(e, details, index)}
                    className={clsx("text-white", classes.editable)}
                    id="line1"
                    placeholder="line1"
                    value={details.line1}
                    style={{ width: "75%" }}
                  />
                  <input
                    onChange={(e) => onChangeHandler(e, details, index)}
                    className={clsx("text-white", classes.editable)}
                    id="line2"
                    placeholder="line2"
                    value={details.line2}
                    style={{ width: "75%" }}
                  />
                  <input
                    onChange={(e) => onChangeHandler(e, details, index)}
                    className={clsx("text-white", classes.editable)}
                    id="line3"
                    placeholder="line4"
                    value={details.line3}
                    style={{ width: "75%" }}
                  />
                  <input
                    onChange={(e) => onChangeHandler(e, details, index)}
                    className={clsx("text-white", classes.editable)}
                    id="line1"
                    placeholder="line1"
                    value={details.line4}
                    style={{ width: "75%" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div class="page_speed_247610277"></div>

      <div class="container text-center  py-2 py-lg-10">

        <input
          className={clsx(
            "font-size-2 font-weight-bold  pt-1",
            classes.editable
          )}
          placeholder="copyright"
          style={{ color: "#ffc107" }}
          id="copyright"
          onChange={onChange}
          value={localData.copyright}
        />
      </div>
    </>
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

      <footer className={classes.blockDark}>
        <div className={classes.Topcurvedbg}></div>
        {ctx.isEditable ? (
          editable
        ) : (
          <>
            <div class="container ">
              <div class="row py-3">
                {card.map((data, index) => (
                  <div key={index} class="col-md-3">
                    <div className="py-2">
                      <i
                        style={{
                          fontSize: "25px ",
                          padding: "5px",
                          background: "#ffc107",
                          borderRadius: "50px",
                          color: "#0d151e",
                        }}
                        class="fa fa-car mx-1  d-inline fa-lg"
                      ></i>
                      <h5 className="d-inline text-white">{data.headline}</h5>
                      <p className="text-white">{data.tagline}</p>
                    </div>
                    <div class="pb-10">
                      <h3
                        style={{ color: "#ffc107" }}
                        class=" mb-2 mb-lg-7 font-size-3"
                      >
                        {data.header}
                      </h3>

                      <div class="d-flex flex-column font-size-2 font-weight-bold">
                        <p class="text-white text-hover-primary ">
                          {data.line1}
                        </p>
                        <p class="text-white text-hover-primary ">
                          {data.line2}
                        </p>
                        <p class="text-white text-hover-primary ">
                          {data.line3}
                        </p>
                        <p class="text-white text-hover-primary ">
                          {data.line4}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div class="page_speed_247610277"></div>

            <div class="container text-center  py-2 py-lg-10">
              <span
                style={{ color: "#ffc107" }}
                class="font-size-2 font-weight-bold  pt-1"
              >
                {localData.copyright}
              </span>
            </div>
          </>
        )}
      </footer>
    </>
  );
};
