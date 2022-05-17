import React, { useContext, useState } from "react";
import styles from "./ICard1.module.css";
import AuthContext from "../../../Context/Context";
import Loader from "../../../loader/Loader";
import clsx from "clsx";
import { Update } from "../../../loader/Update";
import { ReactComponent as DeleteIcon } from "../../../Assests/delete.svg";

const ICard1 = (props) => {
  // const classes = useStyles();

  const [loading, setloading] = useState(false);
  const [updatestatus, setUpdatestatus] = useState(false);
  const ctx = useContext(AuthContext);
  const cardData = [
    {
      title: "Enrollement",
      para: "It is a long established fact that a reader will be distracted",
      id: "0",
    },
    {
      title: "Curriculam",
      para: "It is a long established fact that a reader will be distracted",
      id: "1",
    },
    {
      title: "Programs",
      para: "It is a long established fact that a reader will be distracted",
      id: "2",
    },
  ];
  const [localData, setLocalData] = useState(
    ctx.websiteData[props.id] === undefined
      ? cardData
      : ctx.websiteData[props.id]
  );

  const onChangeHandler = (e, details, index) => {
    setLocalData((prevState) => {
      let updatedData = null;
      if (e.target.id === "title") {
        updatedData = {
          ...details,
          title: e.target.value,
        };
      } else {
        updatedData = {
          ...details,
          para: e.target.value,
        };
      }
      prevState[index] = updatedData;
      return [...prevState];
    });
  };
  const addCard = () => {
    let updatedData = {
      title: "Programs",
      para: "It is a long established fact that a reader will be distracted",
      id: localData.length,
    };
    setLocalData((prevState) => {
      return [...prevState, updatedData];
    });
  };
  const removeCard = (value) => {
    setLocalData((prevState) => {
      prevState = prevState.filter((item) => item.id !== value);
      return [...prevState];
    });
  };

  let editable = (
    <>
       {updatestatus === true && <Update />}
  
    <div className={clsx("row position-relative", styles.cards)}>

      {localData.map((details, index) => (
        <div className={`col-md-3  ${styles.card} `} key={index}>
          <div className={`${styles.cardin}`}>
            <div className={`${styles.round}`}>
              <i className="fa fa-pencil-square-o icon" aria-hidden="true"></i>
            </div>
            <div
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
            <input
              type="text"
              onChange={(e) => onChangeHandler(e, details, index)}
              className={`${styles.inputHeading}`}
              id="title"
              value={details.title}
            />
            <textarea
              onChange={(e) => onChangeHandler(e, details, index)}
              className={`${styles.inputPara}`}
              id="para"
              value={details.para}
            />
          </div>
        </div>
      ))}
      <div className={styles.addCard} onClick={addCard}>
        <i class="fa fa-plus-circle mx-2" aria-hidden="true"></i> Add Card
      </div>
    </div>
    </>
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
        <>
          <div className={clsx("row", styles.cards)}>
            {localData.map((details, index) => (
              <div className={`col-md-3  ${styles.card} `} key={index}>
                <div className={`${styles.cardin}`}>
                  <div className={`${styles.round}`}>
                    <i
                      className="fa fa-pencil-square-o icon"
                      aria-hidden="true"
                    ></i>
                  </div>
                  <h2>{details.title}</h2>
                  <p className="">{details.para}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default ICard1;
