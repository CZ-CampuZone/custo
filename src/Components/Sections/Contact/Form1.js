import React, { useContext, useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import OwlCarousel from "react-owl-carousel";
import AuthContext from "../../../Context/Context";
import Loader from "../../../loader/Loader";
import clsx from "clsx";
import "./Form1.css";
import Cat2 from "../../../Assests/images/cat2.jpg";
import Cat1 from "../../../Assests/images/cat1.jpg";

import { Update } from "../../../loader/Update";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const useStyles = makeStyles(() =>
  createStyles({
    contactTitle: {
      position: "relative",
      display: "block",
      color: "#131313",
      fontSize: "36px",
      lineHeight: "46px",
      fontWeight: "700",
      textTransform: "uppercase",
    },
    editableHeader: {
      width: "100%",
      fontSize: "25px",
      textAlign: "center",
      color: "red",
      background: "transparent",
      outline: "0",
      border: "none",
      marginBottom: "10px",
    },
    editable: {
      width: "100%",
      textAlign: "center",
      color: "black",
      background: "transparent",
      outline: "0",
      border: "none",
    },
    inputFile: {
      width: 0,
      height: 0,
      opacity: 0,
      zIndex: "0",
    },
    inputLabel: {
      position: "absolute",
      background: "#fff",
      width: "2.5rem",
      height: "2.5rem",
      padding: "0.3rem",
      bottom: "0",
      right: "0",
      zIndex: 20,
      textAlign: "center",
      cursor: "pointer",
      "& i": {
        fontSize: "1.75rem",
      },
    },
    "@media (max-width: 600px)": {
      col: {
        width: "100%",
      },
    },
  })
);

export const Form1 = (props) => {
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
      img1: Cat1,
      img2: Cat2,
    },
  ];

  const [localData, setLocalData] = useState(
    ctx.websiteData[props.id] === undefined ? data : ctx.websiteData[props.id]
  );

  const onChangeHandler = (e, details, index) => {
    const tempEventInputs = JSON.parse(JSON.stringify(details));
    if (e.target) {
      tempEventInputs[e.target.id] = e.target.value;
    }
    setLocalData((prevState) => {
      prevState[index] = tempEventInputs;
      return [...prevState];
    });
  };
  const onImageChange = (e, i) => {
    // setError(null);

    let selected = e.target.files[0];

    if (!selected) {
      // setError("Please select file");
      return;
    }

    if (!selected.type.includes("image")) {
      // setError("Please select image file");
      return;
    }
    const storage = getStorage();
    const uploadPath = `images/${localData[i].title + localData[i].id}`; // upload path
    const storageRef = ref(storage, uploadPath); // create refernce to store data

    uploadBytes(storageRef, selected).then((snapshot) => {
      // console.log(snapshot);
      getDownloadURL(storageRef).then((url) => {
        setLocalData((prevState) => {
          let updatedData = null;
          updatedData = {
            ...prevState[i],
            img1: url,
          };

          prevState[i] = updatedData;
          return [...prevState];
        });
      });
    });
    // setError(null);
  };
  const onImgChange = (e, i) => {
    // setError(null);

    let selected = e.target.files[0];

    if (!selected) {
      // setError("Please select file");
      return;
    }

    if (!selected.type.includes("image")) {
      // setError("Please select image file");
      return;
    }
    const storage = getStorage();
    const uploadPath = `images/${localData[i].title + localData[i].id}`; // upload path
    const storageRef = ref(storage, uploadPath); // create refernce to store data

    uploadBytes(storageRef, selected).then((snapshot) => {
      // console.log(snapshot);
      getDownloadURL(storageRef).then((url) => {
        setLocalData((prevState) => {
          let updatedData = null;
          updatedData = {
            ...prevState[i],
            img2: url,
          };

          prevState[i] = updatedData;
          return [...prevState];
        });
      });
    });
    // setError(null);
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
              <input
                type="file"
                onChange={(e) => onImageChange(e, index)}
                className={classes.inputFile}
                id={details.address}
                name={details.address}
              />
              <label className={classes.inputLabel} htmlFor={details.address}>
                <i className="fa fa-upload"></i>
              </label>
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
              <input
                type="file"
                onChange={(e) => onImgChange(e, index)}
                className={classes.inputFile}
                id={details.contact}
                name={details.contact}
              />
              <label className={classes.inputLabel} htmlFor={details.contact}>
                <i className="fa fa-upload"></i>
              </label>
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
                  <img src={item.img1} alt={item.header} />
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
                  <img src={item.img2} alt={item.header} />
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
