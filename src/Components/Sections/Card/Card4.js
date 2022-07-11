import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import "./Card4.css";
import child2 from "../../../Assests/images/child2.png";
import child3 from "../../../Assests/images/child3.png";
import child4 from "../../../Assests/images/child4.png";
import React, { useContext, useEffect, useState, useRef } from "react";
import AuthContext from "../../../Context/Context";
import Loader from "../../../loader/Loader";
import { ReactComponent as DeleteIcon } from "../../../Assests/delete.svg";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Update } from "../../../loader/Update";

const useStyles = makeStyles(() => ({
  cardshadow: {
    width: "300px",
    borderRadius: "20px",
  },
  editable: {
    width: "100%",
    background: "transparent",
    outline: 0,
    border: "none",
    textAlign: "center",
    color: "#fff",
  },
  subtitle: {
    width: "100%",
    background: "transparent",
    outline: 0,
    border: "none",
    textAlign: "center",
    color: "#6a6363",
  },
  addCard: {
    borderRadius: "1rem",
    heigh: "fit-content",
    background: "#fff",
    padding: "1rem 2rem",
    cursor: "pointer",
    top: "1rem",
    color: "#9e3a8ccc",
    right: "1rem",
    boxShadow: "2px 2px 3px 0 #ccc",
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
  cardBtn: {
    background: "linear-gradient(140deg, #f30c80 30%, #9c03c2)",
    outline: "transparent",
    border: "none",
    "& focus": {
      outline: "none !important",
      border: "none",
    },
    "& hover": {
      transition: "0.8s",
      backgroundColor: "rgba(0, 0, 0, 0.616)",
    },
  },
  zoom: {
    overflow: "hidden",
    height: "200px",
  },

  zoomImg: {
    transition: "transform 0.3s ease-in-out",
    "& hover": {
      transform: "scale(1.5)",
    },
  },
  bright: {
    borderRight: "1px dashed rgba(0, 0, 0, 0.397)",
  },
  cardHover: {
    "& hover img": {
      transform: "scale(1.5)",
    },
  },
  cardhead: {
    borderBottom: "2px solid black",
    borderBottomColor: "white",
    width: "100px",
  },
}));

export const Card4 = (props) => {
  const [loading, setloading] = useState(false);
  const [updatestatus, setUpdatestatus] = useState(false);
  const ctx = useContext(AuthContext);

  const cardData = [
    {
      title: "Nursery",
      para: "   Quality education in the early years of preschool sets a firm  foundation in the overall development of a child.",
      subtitle1: "Age group",
      subtitle2: "Duration",
      image: child2,
      id: 1,
    },

    {
      title: "Nursery",
      para: "   Quality education in the early years of preschool sets a firm  foundation in the overall development of a child.",
      subtitle1: "Age group",
      subtitle2: "Duration",
      image: child3,
      id: 2,
    },
    {
      title: "Nursery",
      para: "   Quality education in the early years of preschool sets a firm  foundation in the overall development of a child.",
      subtitle1: "Age group",
      subtitle2: "Duration",
      image: child4,
      id: 3,
    },
  ];

  const [localData, setLocalData] = useState(
    ctx.websiteData[props.id] === undefined
      ? cardData
      : ctx.websiteData[props.id]
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
  const classes = useStyles();
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
            img: url,
          };
          prevState[i] = updatedData;
          return [...prevState];
        });
      });
    });
    // setError(null);
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
    <div className="postion-relative">
      <div class="container">
        {updatestatus === true && <Update />}
        <div class="row mt-5">
          {localData.map((data, index) => (
            <div
              key={index}
              class={clsx(classes.cardshadow, "col-sm-12 col-lg-4")}
            >
              <div class="card shadow">
                <div class={clsx(classes.zoom, " position-relative")}>
                  <input
                    type="file"
                    onChange={(e) => onImageChange(e, index)}
                    className={classes.inputFile}
                    id={data.id}
                    name={data.title}
                  />
                  <label className={classes.inputLabel} htmlFor={data.id}>
                    <i className="fa fa-upload"></i>
                  </label>
                  <img
                    class={clsx("card-img-top")}
                    src={data.image}
                    alt="Card image"
                  />
                </div>
                <div class="card-body bg-primary text-light">
                  {/* <h4 class="card-title">{data.title}</h4> */}
                  <input
                    onChange={(e) => onChangeHandler(e, data, index)}
                    className={classes.editable}
                    id="title"
                    placeholder="title"
                    value={data.title}
                  />
                  <div class={clsx(classes.cardhead, "head mb-2")}></div>
                  {/* <p class="card-text">{data.para}</p> */}
                  <textarea
                    onChange={(e) => onChangeHandler(e, data, index)}
                    className={classes.editable}
                    id="para"
                    placeholder="para"
                    value={data.para}
                  />
                  <div class="row text-center my-2 bg-white rounded p-3">
                    <div class={clsx(classes.bright, "col ")}>
                      {/* <p className="text-muted">{data.subtitle1}</p> */}
                      <input
                        onChange={(e) => onChangeHandler(e, data, index)}
                        className={classes.subtitle}
                        id="subtitle1"
                        placeholder="title"
                        value={data.subtitle1}
                      />
                    </div>
                    <div class="col">
                      {/* <p className="text-muted">{data.subtitle2}</p> */}
                      <input
                        onChange={(e) => onChangeHandler(e, data, index)}
                        className={classes.subtitle}
                        id="subtitle2"
                        placeholder="title"
                        value={data.subtitle2}
                      />
                    </div>
                  </div>
                  <a
                    href="#"
                    class={clsx(classes.cardBtn, "btn px-3 mt-3  text-white ")}
                    style={{ borderRadius: "30px" }}
                  >
                    Read more
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
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
        <div class="container">
          <div class="row mt-5">
            {localData.map((data, index) => (
              <div class={clsx(classes.cardshadow, "col-sm-12 col-lg-4")}>
                <div class={clsx(classes.cardHover, "card shadow")}>
                  <div class={classes.zoom}>
                    <img
                      class={clsx(classes.zoomImg, "card-img-top")}
                      src={data.image}
                      alt="Card image"
                    />
                  </div>
                  <div class="card-body bg-primary text-light">
                    <h4 class="card-title">{data.title}</h4>
                    <div class="head mb-2"></div>
                    <p class="card-text">{data.para}</p>
                    <div class="row text-center my-2 bg-white rounded p-3">
                      <div class={clsx(classes.bright, "col ")}>
                        <p className="text-muted">{data.subtitle1}</p>
                      </div>
                      <div class="col">
                        <p className="text-muted">{data.subtitle2}</p>
                      </div>
                    </div>
                    <center>
                      <a
                        href="#"
                        class={clsx(
                          classes.cardBtn,
                          "btn px-3 mt-3  text-white "
                        )}
                        style={{ borderRadius: "30px" }}
                      >
                        Read more
                      </a>
                    </center>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
