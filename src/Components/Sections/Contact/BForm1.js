import React, { useContext, useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import OwlCarousel from "react-owl-carousel";
import AuthContext from "../../../Context/Context";
import Loader from "../../../loader/Loader";
import clsx from "clsx";
import "./BForm1.css";
import Cat2 from "../../../Assests/images/cat2.jpg";
import Cat1 from "../../../Assests/images/cat1.jpg";
import { fontSize, margin, textAlign } from "@mui/system";
import { Update } from "../../../loader/Update";

const useStyles = makeStyles(() =>
  createStyles({
    contactTitle:{
      position: "relative",
      display: "block",
      color: "#131313",
      fontSize: "36px",
      lineHeight: "46px",
      fontWeight: "700",
      textTransform: "uppercase"
    },
    editableHeader:{
      width:"100%",
      fontSize:"25px",
      textAlign: "center",
      color: "red",
      background: "transparent",
      outline: "0",
      border: "none",
      marginBottom:"10px"
    },
    editable: {
      width:"100%",
      textAlign: "center",
      color: "black",
      background: "transparent",
      outline: "0",
      border: "none",
    },
   
    "@media (max-width: 600px)": {
      col: {
        width: "100%",
      },
    },
  })
);

export const BForm1 = (props) => {
  const [loading, setloading] = useState(false);
  const [updatestatus, setUpdatestatus] = useState(false);
  const ctx = useContext(AuthContext);
  const data = [
    {
      header: "layatex",
      para: "Fixyman is proud to be the name that nearly 1 million homeowners have trusted since 1996 for home improvement and repair,providing virtually any home rep.",
      address: "Intro header 1 Vel Nagar, Aavadi",
      contact: "l472487229",
      email: "loerum@gmail.com",
      img1: Cat2,
      img2: Cat2,
    },
  ];

  const [localData, setLocalData] = useState(
    ctx.websiteData[props.id] === undefined ? data : ctx.websiteData[props.id]
  );
  const onChangeHandler = (e, details, index) => {
    setLocalData((prevState) => {
      let updatedData = null;
      if (e.target.id === "header") {
        updatedData = {
          ...details,
          header: e.target.value,
        };
      } else if (e.target.id === "para") {
        updatedData = {
          ...details,
          para: e.target.value,
        };
      } else if (e.target.id === "address") {
        updatedData = {
          ...details,
          address: e.target.value,
        };
      } else if (e.target.id === "contact") {
        updatedData = {
          ...details,
          contact: e.target.value,
        };
      } else if (e.target.id === "email") {
        updatedData = {
          ...details,
          email: e.target.value,
        };
      }
      prevState[index] = updatedData;
      return [...prevState];
    });
  };
  const classes = useStyles();
  let editable = (
    <div class="contact-address-area">
       {updatestatus === true && <Update />}
      {localData?.map((details, index) => (
        <div key={index} class="container">
          <div class="sec-title-style1 text-center max-width">
            <div class={classes.contactTitle}>Contact Us</div>
            <div class="text">
              <div class="decor-left">
                <span></span>
              </div>
              <p>Quick Contact</p>
              <div class="decor-right">
                <span></span>
              </div>
            </div>
            <div class="bottom-text">
              {/* <p>{details.para}</p> */}
              <input
                onChange={(e) => onChangeHandler(e, details, index)}
                className={classes.editable}
                id="para"
                placeholder="para"
                value={details.para}
              />
            </div>
          </div>
          <div class="contact-address-box row">
            {/* <!--Start Single Contact Address Box--> */}
            <div class="col-sm-4 single-contact-address-box text-center">
              <img src={details.img1} />
            </div>
            {/* <!--End Single Contact Address Box-->
              <!--Start Single Contact Address Box--> */}
            <div class="col-sm-4 single-contact-address-box main-branch rounded">
              {/* <h3>{item.header}</h3> */}
              <input
                onChange={(e) => onChangeHandler(e, details, index)}
                className={classes.editableHeader}
                id="header"
                placeholder="header"
                value={details.header}
              />
              <div class="inner">
                <ul>
                  <li>
                    <div class="text">
                      <h5>
                        <i className="fa fa-map-marker mx-2"></i>Address:
                      </h5>
                      <p className="mx-5">
                        {" "}
                        <input
                          onChange={(e) => onChangeHandler(e, details, index)}
                          className={classes.editable}
                          id="address"
                          placeholder="address"
                          value={details.address}
                        />
                        {/* {item.address} */}
                        <br />
                      </p>
                    </div>
                  </li>
                  <li>
                    <div class="text">
                      <h5>
                        {" "}
                        <i className="fa fa-phone mx-2"></i>Contact No:
                      </h5>
                      {/* <p className="mx-5">{item.contact}</p> */}
                      <input
                        onChange={(e) => onChangeHandler(e, details, index)}
                        className={classes.editable}
                        id="contact"
                        placeholder="contact"
                        value={details.contact}
                      />
                    </div>
                  </li>
                  <li>
                    <div class="text">
                      <h5>
                        {" "}
                        <i className="fa fa-envelope mx-2"></i>Email:
                      </h5>
                      {/* <p className="mx-5">{item.email}</p> */}
                      <input
                        onChange={(e) => onChangeHandler(e, details, index)}
                        className={classes.editable}
                        id="email"
                        placeholder="email"
                        value={details.email}
                      />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            {/* <!--End Single Contact Address Box-->
              <!--Start Single Contact Address Box--> */}
            <div class="col-sm-4 single-contact-address-box text-center">
              <img src={details.img2} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
  const onSaveHandler = () => {
    setloading(true);
    ctx.updateData(localData, props.id);
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
        <div class="contact-address-area">
          {localData?.map((item, index) => (
            <div key={index} class="container">
              <div class="sec-title-style1 text-center max-width">
                <div class="title">Contact Us</div>
                <div class="text">
                  <div class="decor-left">
                    <span></span>
                  </div>
                  <p>Quick Contact</p>
                  <div class="decor-right">
                    <span></span>
                  </div>
                </div>
                <div class="bottom-text">
                  <p>{item.para}</p>
                </div>
              </div>
              <div class="contact-address-box row">
                {/* <!--Start Single Contact Address Box--> */}
                <div class="col-sm-4 single-contact-address-box text-center">
                  <img src={Cat2}  alt={item.header}/>
                </div>
                {/* <!--End Single Contact Address Box-->
              <!--Start Single Contact Address Box--> */}
                <div class="col-sm-4 single-contact-address-box main-branch rounded">
                  <h3>{item.header}</h3>
                  <div class="inner">
                    <ul>
                      <li>
                        <div class="text">
                          <h5>
                            <i className="fa fa-map-marker mx-2"></i>Address:
                          </h5>
                          <p className="mx-5">
                            {" "}
                            {item.address}
                            <br />
                          </p>
                        </div>
                      </li>
                      <li>
                        <div class="text">
                          <h5>
                            {" "}
                            <i className="fa  fa-phone  mx-2"></i>Contact No:
                          </h5>
                          <p className="mx-5">{item.contact}</p>
                        </div>
                      </li>
                      <li>
                        <div class="text">
                          <h5>
                            {" "}
                            <i className="fa fa-envelope mx-2"></i>Email:
                          </h5>
                          <p className="mx-5">{item.email}</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* <!--End Single Contact Address Box-->
              <!--Start Single Contact Address Box--> */}
                <div class="col-sm-4 single-contact-address-box text-center">
                  <img src={Cat1}  alt={item.header}/>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
export default Form1;
