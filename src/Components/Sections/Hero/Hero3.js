import React, { useContext, useState } from "react";
import AuthContext from "../../../Context/Context";
import styles from "./Hero3.module.css";
import Loader from "../../../loader/Loader";
import clsx from "clsx";
import { Update } from "../../../loader/Update";

import banner from "../../../Assests/diviImages/banner1.jpg";

const Hero3 = (props) => {
  const [loading, setloading] = useState(false);
  const ctx = useContext(AuthContext);
  const [updatestatus, setUpdatestatus] = useState(false);
  
  // const data = {
  //   container: {
  //     style: `container  ${styles.preschool}`,
  //     value: "",
  //   },
  //   heading: {
  //     style: `${styles.head}`,
  //     value: "Our Pre-School. Our Family. Our Community",
  //   },
  //   paragraph: {
  //     style: `${styles.preschool_text_p}`,
  //     value:
  //       "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various version",
  //   },
  // };
  const data = {
    header:  "Our Pre-School. Our Family. Our Community",
    para : "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various version",
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
      <Loader/>
      </>
    )}
      <div className={clsx("container",styles.preschool,)}>
        <div className="row m-0">
          <div className={`col-md-7 ${styles.boxen}`}>
            <div className={` ${styles.preschool_text}`}>
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
              <h2 className={ `${styles.inputHeading}`}>{localData.header}</h2>
              <p className={ `${styles.inputPara}`}>{localData.para}</p>
            </>
          )}
            </div>
          </div>
          <div className={`col-md-5 ${styles.bot} ${styles.rt_pad}`}>
            <div className={` ${styles.image}`}>
              <img className="img-fluid" src={banner}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero3;
