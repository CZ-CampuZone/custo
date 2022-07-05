import React, { useContext, useState } from "react";
import AuthContext from "../../../Context/Context";
import styles from "./Form3.module.css";
import Loader from "../../../loader/Loader";
import clsx from "clsx";
import { Update } from "../../../loader/Update";

const Form1 = (props) => {
  const [loading, setloading] = useState(false);
  const [updatestatus, setUpdatestatus] = useState(false);
  const ctx = useContext(AuthContext);
  const data = {
    header: "Contact Us",
    para: " Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmodtempor incidunt ut labore et dolore magna aliqua. Ut enim ad minimeniam, quis nostrum",
    address: "xxx, yyy, zzz - 123123",
    phone: "99887 766554",
    email: "sample@gmail.com",
  };
  const [localData, setLocalData] = useState(
    ctx.websiteData[props.id] === undefined ? data : ctx.websiteData[props.id]
  );
  const onChangeHandler = (event) => {
    let val = event.target.value;
    setLocalData((prevState) => {
      return {
        ...prevState,
        [event.target.id]: val,
      };
    });
  };
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
        <>
         {updatestatus === true && <Update />}
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
     </>
      ) : (
        <></>
      )}
      {loading && (
        <>
          <Loader />
        </>
      )}
      <section id="#contact">
        <section className={styles.contact}>
          <div className={styles.content}>
            <h2 className={styles.content_h2}>{localData.header}</h2>
            {ctx.isEditable ? (
              <>
                <textarea
                  id="para"
                  className={styles.inputPara}
                  onChange={onChangeHandler}
                  value={localData.para}
                />
              </>
            ) : (
              <>
                <p className={styles.content_p}>{localData.para}</p>
              </>
            )}
          </div>
          <div className={clsx("container", styles.con)}>
            <div className={styles.contactInfo}>
              <div className={styles.box}>
                <div className={styles.icon_address}>
                  <i
                    className="fa fa-location-arrow ico"
                    aria-hidden="true"
                  ></i>
                </div>
                <div className={styles.text_address}>
                  <h3>Address</h3>

                  {ctx.isEditable ? (
                    <>
                      <textarea
                        id="address"
                        className={styles.inputtext}
                        onChange={onChangeHandler}
                        value={localData.address}
                      />
                    </>
                  ) : (
                    <>
                      <p className={styles.text_address_p}>
                        {localData.address}
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className={styles.box}>
                <div className={styles.icon_address}>
                  <i
                    className="fa fa-volume-control-phone ico"
                    aria-hidden="true"
                  ></i>
                </div>
                <div className={styles.text_address}>
                  <h3>Phone</h3>
                  {ctx.isEditable ? (
                    <>
                      <input
                        type="number"
                        id="phone"
                        className={styles.inputtext}
                        onChange={onChangeHandler}
                        value={localData.phone}
                      />
                    </>
                  ) : (
                    <>
                      <p className={styles.text_address_p}>{localData.phone}</p>
                    </>
                  )}
                </div>
              </div>

              <div className={styles.box}>
                <div className={styles.icon_address}>
                  <i className="fa fa-envelope ico" aria-hidden="true"></i>
                </div>
                <div className={styles.text_address}>
                  <h3>Email</h3>
                  {ctx.isEditable ? (
                    <>
                      <input
                        id="email"
                        className={styles.inputtext}
                        onChange={onChangeHandler}
                        value={localData.email}
                      />
                    </>
                  ) : (
                    <>
                      <p className={styles.text_address_p}>{localData.email}</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.ContactForm}>
              <form>
                <h2>Send Us A Message</h2>
                <div className={styles.inputbox}>
                  <label>Name</label>
                  <input type="text" required="required" />
                </div>
                <div className={styles.inputbox}>
                  <label>Email</label>
                  <input type="text" required="required" />
                </div>
                <div className={styles.inputbox}>
                  <label>Your Message</label>
                  <textarea required="required" />
                </div>
                <div className={styles.inputbox}>
                  <input type="submit" value="Send" />
                </div>
              </form>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default Form1;
