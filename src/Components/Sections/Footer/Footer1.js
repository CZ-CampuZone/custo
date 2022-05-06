import "./Footer1.css";
import React, { useContext, useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import AuthContext from "../../../Context/Context";
import Loader from "../../../loader/Loader";
import { Update } from "../../../loader/Update";
import clsx from "clsx";

const useStyles = makeStyles(() =>
  createStyles({
    editable: {
      textAlign: "center",
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
    head1: "Fast Delivery",
    tag1: "For All the oders over 200",
    head2: "Fast Delivery",
    tag2: "For All the oders over 200",
    head3: "Fast Delivery",
    tag3: "For All the oders over 200",
    head4: "Fast Delivery",
    tag4: "For All the oders over 200",
    data: [
      {
        header: "Intro header 1",
        line1: "loerum",
        line2: "loerum",
        line3: "loerum",
        line4: "loerum",
        id: "0",
      },
      {
        header: "Intro header 2",
        line1: "loerum",
        line2: "loerum",
        line3: "loerum",
        line4: "loerum",
        id: "1",
      },
      {
        header: "Intro header 2",
        line1: "loerum",
        line2: "loerum",
        line3: "loerum",
        line4: "loerum",
        id: "2",
      },
      {
        header: "Intro header 2",
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
    setLocalData((prevState) => {
      let updatedData = null;
      if (e.target.id === "header") {
        updatedData = {
          ...details,
          header: e.target.value,
        };
      } else if (e.target.id === "line1") {
        updatedData = {
          ...details,
          line1: e.target.value,
        };
      } else if (e.target.id === "line2") {
        updatedData = {
          ...details,
          line2: e.target.value,
        };
      } else if (e.target.id === "line3") {
        updatedData = {
          ...details,
          line3: e.target.value,
        };
      } else if (e.target.id === "line4") {
        updatedData = {
          ...details,
          line4: e.target.value,
        };
      }
      prevState[index] = updatedData;
      return [...prevState];
    });
  };
  let editable = (
    <>
      {updatestatus === true && <Update />}
      <div className="row w-100 m-auto p-2">
        <div className="col-md-3  d-md-flex justify-content-center">
          <div>
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
            <h5 className="">{localData.head1}</h5>
            <input
              className={clsx("d-inline text-white", classes.editable)}
              placeholder="head1"
              id="head1"
              onChange={onChange}
              value={localData.head1}
            />
            <input
              className={clsx(" text-white", classes.editable)}
              placeholder="tag1"
              id="tag1"
              onChange={onChange}
              value={localData.tag1}
            />
          </div>
        </div>
        <div className="col-md-3 d-md-flex  justify-content-center">
          <div>
            <i
              style={{
                fontSize: "25px ",
                padding: "5px",
                background: "#ffc107",
                borderRadius: "50px",
                color: "#0d151e",
              }}
              class="fas fa-store-slash  mx-1  d-inline fa-lg"
            ></i>
            <input
              className={clsx("d-inline text-white", classes.editable)}
              placeholder="head2"
              id="head2"
              onChange={onChange}
              value={localData.head2}
            />
            <input
              className={clsx(" text-white", classes.editable)}
              placeholder="tag2"
              id="tag2"
              onChange={onChange}
              value={localData.tag2}
            />
          </div>
        </div>
        <div className="col-md-3 d-md-flex  justify-content-center">
          <div>
            <i
              style={{
                fontSize: "25px ",
                padding: "5px",
                background: "#ffc107",
                borderRadius: "50px",
                color: "#0d151e",
              }}
              class="	far fa-credit-card mx-1  d-inline fa-lg"
            ></i>
            <input
              className={clsx("d-inline text-white", classes.editable)}
              placeholder="head3"
              id="head3"
              onChange={onChange}
              value={localData.head3}
            />
            <input
              className={clsx(" text-white", classes.editable)}
              placeholder="tag3"
              id="tag3"
              onChange={onChange}
              value={localData.tag3}
            />
          </div>
        </div>
        <div className="col-md-3  d-md-flex justify-content-center">
          <div>
            <i
              style={{
                fontSize: "25px ",
                padding: "5px",
                background: "#ffc107",
                borderRadius: "50px",
                color: "#0d151e",
              }}
              class="fas fa-leaf mx-1  d-inline fa-lg"
            ></i>
            <input
              className={clsx("d-inline text-white", classes.editable)}
              placeholder="head4"
              id="head4"
              onChange={onChange}
              value={localData.head4}
            />
            <input
              className={clsx(" text-white", classes.editable)}
              placeholder="tag4"
              id="tag4"
              onChange={onChange}
              value={localData.tag4}
            />
          </div>
        </div>
      </div>
      <div class="container mt-n15">
        <div class="row">
          {card.map((details, index) => (
            <div key={index} class="col-6 col-lg">
              <div class="pb-10">
                <input
                  style={{ color: "#ffc107" }}
                  className={clsx("mb-2 mb-lg-7 font-size-3", classes.editable)}
                  placeholder="Header"
                  id="header"
                  onChange={(e) => onChangeHandler(e, details, index)}
                  value={localData.header}
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
        {localData.copyright}
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
      head1: localData.head1,
      head2: localData.head2,
      head3: localData.head3,
      head4: localData.head4,
      tag1: localData.tag1,
      tag2: localData.tag2,
      tag3: localData.tag3,
      tag4: localData.tag4,
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

      <footer class="footer block-dark mt-n15 mt-lg-n30 ">
        <div class="h-150px  bgi-no-repeat bgi-position-x-center bgi-position-y-top bgi-size-cover dark-top-curved-bg"></div>
        {ctx.isEditable ? (
          editable
        ) : (
          <>
            <div className="row w-100 m-auto p-2">
              <div className="col-md-3  d-md-flex justify-content-center">
                <div>
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
                  <h5 className="d-inline text-white">{localData.head1}</h5>
                  <p className="text-white">{localData.tag1}</p>
                </div>
              </div>
              <div className="col-md-3 d-md-flex  justify-content-center">
                <div>
                  <i
                    style={{
                      fontSize: "25px ",
                      padding: "5px",
                      background: "#ffc107",
                      borderRadius: "50px",
                      color: "#0d151e",
                    }}
                    class="fas fa-store-slash  mx-1  d-inline fa-lg"
                  ></i>
                  <h5 className="d-inline text-white">{localData.head2}</h5>
                  <p className="text-white">{localData.tag2}</p>
                </div>
              </div>
              <div className="col-md-3 d-md-flex  justify-content-center">
                <div>
                  <i
                    style={{
                      fontSize: "25px ",
                      padding: "5px",
                      background: "#ffc107",
                      borderRadius: "50px",
                      color: "#0d151e",
                    }}
                    class="	far fa-credit-card mx-1  d-inline fa-lg"
                  ></i>
                  <h5 className="d-inline text-white">{localData.head3}</h5>
                  <p className="text-white">{localData.tag3}</p>
                </div>
              </div>
              <div className="col-md-3  d-md-flex justify-content-center">
                <div>
                  <i
                    style={{
                      fontSize: "25px ",
                      padding: "5px",
                      background: "#ffc107",
                      borderRadius: "50px",
                      color: "#0d151e",
                    }}
                    class="fas fa-leaf mx-1  d-inline fa-lg"
                  ></i>
                  <h5 className="d-inline text-white">{localData.head4}</h5>
                  <p className="text-white">{localData.tag4}</p>
                </div>
              </div>
            </div>
            <div class="container mt-n15">
              <div class="row">
                {card.map((data, index) => (
                  <div key={index} class="col-6 col-lg">
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
