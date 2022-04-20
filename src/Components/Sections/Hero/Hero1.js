import React, { useContext, useState } from "react";
import AuthContext from "../../../Context/Context";
import styles from "./Hero1.module.css";
import Loader from "../../../loader/Loader";
import BannerImage1 from "../../../Assests/images/banner1.jpg";

const Hero1 = (props) => {
  const [loading, setloading] = useState(false);
  const ctx = useContext(AuthContext);
  // const data = {
  //   container: {
  //     style: "container",
  //     value: "",
  //   },
  //   heading: {
  //     style: "",
  //     value: "Divi Daycare",
  //   },
  //   paragraph: {
  //     style: "",
  //     value:
  //       "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout",
  //   },
  // };
  const data = {
    header: "Divi Daycare",
    para: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout",
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
      <div className={`${styles.hero}`} id="#Home">
        <div className={data.container.style}>
          <img src="/Images/text.png" className="pretext" />
        </div>
        <div className={`container ${styles.texter}`}>
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
              <h2 className={data.heading.style}>{localData.header}</h2>
              <p className={data.paragraph.style}>{localData.para}</p>
            </>
          )}
          <button type="button" className={` ${styles.btn}`}>
            GET STARTED
          </button>
        </div>

        <img
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIydnciIHZpZXdCb3g9IjAgMCAxMjgwIDE0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjZmZmZmZmIj48cGF0aCBkPSJNMTI4MCA4NmMtMTkuOS0xNy4yMS00MC4wOC0zOS42OS03OS44OS0zOS42OS01Ny40OSAwLTU2LjkzIDQ2LjU5LTExNSA0Ni41OS01My42MSAwLTU5Ljc2LTM5LjYyLTExNS42LTM5LjYyQzkyMy43IDUzLjI3IDkyNC4yNiA4NyA4NTMuODkgODdjLTg5LjM1IDAtNzguNzQtODctMTg4LjItODdDNTU0IDAgNTQzLjk1IDEyMS44IDQyMy4zMiAxMjEuOGMtMTAwLjUyIDAtMTE3Ljg0LTU0Ljg4LTE5MS41Ni01NC44OC03Ny4wNiAwLTEwMCA0OC41Ny0xNTEuNzUgNDguNTctNDAgMC02MC0xMi4yMS04MC0yOS41MXY1NEgxMjgweiIvPjwvZz48L3N2Zz4"
          className="wave"
        />
        <img src="/Images/1.png" className="house" />
      </div>
    </>
  );
};

export default Hero1;
