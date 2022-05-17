import React, { useContext, useState } from "react";
import AuthContext from "../../../../Context/Context";
import styles from "./BForm2.css";
import { createStyles, makeStyles } from "@mui/styles";
import Loader from "../../../../loader/Loader";
import clsx from "clsx";

const useStyles = makeStyles(() =>
  createStyles({
    introPara: {
      textAlign: "center",
      color: "#999999",
      width: "100%",
      background: "transparent",
      outline: "0",
      border: "none",
    },
    contactInfo: {
      display: "inline-block",
      width: "100%",
      textAlign: "center",
      marginBottom: "10px",
    },
  })
);
const BForm2 = (props) => {
  const [loading, setloading] = useState(false);
  const ctx = useContext(AuthContext);
  const classes = useStyles();
  const data = {
    header: "Contact Us",
    address1: "xxx, yyy, zzz - ",
    address2: "123123",
    phone1: "9988766554",
    phone2: "9988766554",
    email1: "sample@gmail.com",
    email2: "sample@gmail.com",
  };
  const [localData, setLocalData] = useState(
    ctx.websiteData[props.id] === undefined ? data : ctx.websiteData[props.id]
  );
  const onChange = (event) => {
    let val = event.target.value;
    setLocalData((prevState) => {
      return {
        ...prevState,
        [event.target.id]: val,
      };
    });
  };
  let editable = (
    <>
      <div class="row">
        <div class="col-md-4">
          <div class={classes.contactInfo}>
            <div class="contact-info-item">
              <div class="mb-3 contact-info-icon">
                <i class="fas fa-map-marked"></i>
              </div>
              <div class="contact-info-text">
                <h2>address</h2>
                <input
                  className={clsx(classes.introPara, "d-inline mb-2 mr-4")}
                  placeholder="address1"
                  id="address1"
                  onChange={onChange}
                  value={localData.address1}
                />
                <input
                  className={clsx(classes.introPara, "d-inline mb-2 mr-4")}
                  placeholder="address2"
                  id="address2"
                  onChange={onChange}
                  value={localData.address2}
                />
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class={classes.contactInfo}>
            <div class="contact-info-item">
              <div class="mb-3 contact-info-icon">
                <i class="fas fa-envelope"></i>
              </div>
              <div class="contact-info-text">
                <h2>E-mail</h2>
                <input
                  className={clsx(classes.introPara, "d-inline mb-2 mr-4")}
                  placeholder="email1"
                  id="email1"
                  onChange={onChange}
                  value={localData.email1}
                />
                <input
                  className={clsx(classes.introPara, "d-inline mb-2 mr-4")}
                  placeholder="email2"
                  id="email2"
                  onChange={onChange}
                  value={localData.email2}
                />
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class={classes.contactInfo}>
            <div class="contact-info-item">
              <div class="mb-3 contact-info-icon">
                <i class="fas fa-phone"></i>
              </div>
              <div class="contact-info-text">
                <h2>Phone No</h2>
                <input
                  className={clsx(classes.introPara, "d-inline mb-2 mr-4")}
                  placeholder="phone1"
                  id="phone1"
                  onChange={onChange}
                  value={localData.phone1}
                />
                <input
                  className={clsx(classes.introPara, "d-inline mb-2 mr-4")}
                  placeholder="phone2"
                  id="phone2"
                  onChange={onChange}
                  value={localData.phone2}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  return (
    <>
      {ctx.isEditable ? (
        <div className="row py-3 justify-content-end">
          <div
            className="saveButton"
            onClick={() => {
              setloading(true);
              ctx.updateData(localData);
              setTimeout(() => {
                setloading(false);
              }, 2000);
            }}
          >
            Save
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
      <section class="contact-page-sec">
        <div class="container">
          {ctx.isEditable ? (
            editable
          ) : (
            <div class="row">
              <div class="col-md-4">
                <div class={classes.contactInfo}>
                  <div class="contact-info-item">
                    <div class="mb-3 contact-info-icon">
                      <i class="fas fa-map-marked"></i>
                    </div>
                    <div class="contact-info-text">
                      <h2>address</h2>
                      <span>{localData.address1} </span>
                      <span>{localData.address2}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class={classes.contactInfo}>
                  <div class="contact-info-item">
                    <div class="mb-3 contact-info-icon">
                      <i class="fas fa-envelope"></i>
                    </div>
                    <div class="contact-info-text">
                      <h2>E-mail</h2>
                      <span>{localData.email1}</span>
                      <span>{localData.email2}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class={classes.contactInfo}>
                  <div class="contact-info-item">
                    <div class="mb-3 contact-info-icon">
                      <i class="fas fa-phone"></i>
                    </div>
                    <div class="contact-info-text">
                      <h2>Phone No</h2>
                      <span>{localData.phone1}</span>
                      <span>{localData.phone2}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default BForm2;
