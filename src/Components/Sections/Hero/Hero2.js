import React, { useContext, useState } from "react";
import AuthContext from "../../../Context/Context";
import styles from "./Hero2.module.css";
import Loader from "../../../loader/Loader";
import clsx from "clsx";

const Hero2 = (props) => {
  const [loading, setloading] = useState(false);
  const ctx = useContext(AuthContext);
  // const data = {
  //   container: {
  //     style: `container ${styles.about}`,
  //     value: "",
  //   },
  //   heading: {
  //     style: `${styles.about_h2}`,
  //     value: "About Us",
  //   },
  //   paragraph: {
  //     style: `${styles.about_p}`,
  //     value:
  //       "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout",
  //   },
  // };
  const data = {
    header: "About Us",
    para:  "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout",

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
    }, 2000);
  }; 
  return (
    <>
    {ctx.isEditable ? (
        <div className="row py-3 justify-content-end">
           <button
              className="btn px-5"
              onClick={onSaveHandler}
              style={{
                background: "#fff",
                fontSize:"20px",
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
      <Loader/>
      </>
    )}
      <section id="#About">
      <div className={clsx("container",styles.about)}>
        {ctx.isEditable ? (
            <>
              <input
                id="header"
                className={`${styles.inputHeading}`}
                onChange={onChangeHandler}
                value={localData.header}
              />
              <textarea
                id="para"
                className={`${styles.inputPara}`}
                onChange={onChangeHandler}
                value={localData.para}
              />
            </>
          ) : (
            <>
              <h2 className={ `${styles.inputHeading}`}>{ localData.header}</h2>
              <p className={`${styles.inputPara}`}>{ localData.para }</p>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Hero2;
