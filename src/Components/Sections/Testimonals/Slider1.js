import React, { useContext, useState, useEffect } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import OwlCarousel from "react-owl-carousel";
import AuthContext from "../../../Context/Context";
import Loader from "../../../loader/Loader";
import clsx from "clsx";
import WebFont from "webfontloader";
import { fontSize, margin, textAlign } from "@mui/system";
import { ReactComponent as DeleteIcon } from "../../../Assests/delete.svg";
import { Update } from "../../../loader/Update";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: "relative",
      background: "#efefef",
      fontFamily: "Open Sans",
      padding: "70px 0px",
    },
    container: {
      position: "relative",
      width: "60%",
      margin: "auto",
      padding: "40px 20px",
      boxShadow:
        " rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;",
      borderRadius: "15px",
      background: "white",
    },
    inside: {
      position: "relative",
    },
    introHeader: {
      fontSize: "40px",
      color: "#555",
      textTransform: "capitalize",
      textAlign: "center",
      paddingBottom: "1.5rem",
      background: "transparent",
      outline: 0,
      margin: "20px 0",
      border: "none",
      width: "100%",
      fontFamily: "Raleway",
      fontWeight: "700",
    },
    testName: {
      color: "#555",
      fontFamily: "Raleway",
      marginTop: "5px",
      fontSize: "30px",
      fontWeight: "600",
      textAlign: "center",
    },
    para: {
      textAlign: "center",
      fontSize: "20px",
    },
    editable: {
      color: "black",
      textAlign: "center",
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
    addCard: {
      borderRadius: "1rem",
      position: "absolute",
      background: "#fff",
      padding: "1rem 2rem",
      top: "1rem",
      color:"#9e3a8ccc",
      cursor: "pointer",
      right: "1rem",
      boxShadow: "2px 2px 3px 0 #ccc",
    },
    "@media (max-width: 600px)": {
      container: {
        width: "90%",
      },
      introHeader: {
        fontSize: "20px",
      },
      para: {
        textAlign: "center",
        fontSize: "11px",
      },
      testName: {
       fontSize:"18px",
      },
    },
  })
);

export const Slider1 = (props) => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Raleway"],
      },
    });
  }, []);
  const [loading, setloading] = useState(false);
  const ctx = useContext(AuthContext);
  const cardData = {
    header: "what people Think About US",
    data: [
      {
        name: "Intro header 1",
        para: "If Shai Reznik's TDD videos don't convince you to add automated testing your code, I don't know what will.This was the very best explanation of frameworks for brginners that I've ever seen",
        img: "https://www.w3schools.com/howto/img_avatar.png",
        id: "0",
      },
      {
        name: "Intro header 1",
        para: "If Shai Reznik's TDD videos don't convince you to add automated testing your code, I don't know what will.This was the very best explanation of frameworks for brginners that I've ever seen",
        img: "https://www.w3schools.com/howto/img_avatar.png",
        id: "1",
      },
      {
        name: "Intro header 1",
        para: "If Shai Reznik's TDD videos don't convince you to add automated testing your code, I don't know what will.This was the very best explanation of frameworks for brginners that I've ever seen",
        img: "https://www.w3schools.com/howto/img_avatar.png",
        id: "2",
      },
    ],
  };
  const [localData, setLocalData] = useState(
    ctx.websiteData[props.id] === undefined
      ? cardData
      : ctx.websiteData[props.id]
  );
  const [card, setCard] = useState(localData.data);
  const [updatestatus, setUpdatestatus] = useState(false);
  const onChange = (event) => {
    let val = event.target.value;
    setLocalData((prevState) => {
      return {
        ...prevState,
        [event.target.id]: val,
      };
    });
  };
  const options = {
    loop: true,
    margin: 50,
    dots: true,
    nav: true,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplaySpeed: 2000,
    autoplayHoverPause: true,
    items: 1,
  };
  const onChangeHandler = (e, details, index) => {
    setCard((prevState) => {
      let updatedData = null;
      if (e.target.id === "name") {
        updatedData = {
          ...details,
          name: e.target.value,
        };
      } else if (e.target.id === "para") {
        updatedData = {
          ...details,
          para: e.target.value,
        };
      }
      prevState[index] = updatedData;
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
    const uploadPath = `images/${card[i].name + card[i].id}`; // upload path
    const storageRef = ref(storage, uploadPath); // create refernce to store data

    uploadBytes(storageRef, selected).then((snapshot) => {
      // console.log(snapshot);
      getDownloadURL(storageRef).then((url) => {
        console.log(url)
        setCard((prevState) => {
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
      img: "https://www.w3schools.com/howto/img_avatar.png",
      name: "",
      para: "",
      id: card.length,
    };
    setCard((prevState) => {
      return [...prevState, updatedData];
    });
  };
  const removeCard = (value) => {
    setCard((prevState) => {
      prevState = prevState.filter((item) => item.id !== value);
      return [...prevState];
    });
  };
  let editable = (
    <div>
       <input
          className={classes.introHeader}
          placeholder="Header"
          id="header"
          onChange={onChange}
          value={localData.header}
        />
        {updatestatus === true && <Update />}
      <div className={classes.addCard} onClick={addCard}>
        <i class="fa fa-plus-circle mx-2" aria-hidden="true"></i> Add Card
      </div>
      <div className={classes.container}>
       
        {card.map((details, index) => (
          <div key={index} className={classes.inside}>
            <div
              onClick={() => removeCard(details.id)}
              style={{
                position: "absolute",
                bottom: "0",
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
            <textarea
              onChange={(e) => onChangeHandler(e, details, index)}
              className={classes.editable}
              style={{ width: "100%" }}
              id="para"
              placeholder="Text"
              value={details.para}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "10px",
              }}
            >
              <input
                type="file"
                onChange={(e) => onImageChange(e, index)}
                className={classes.inputFile}
                id={details.id}
                name={details.name}
              />
              <label className={classes.inputLabel} htmlFor={details.id}>
                <i className="fa fa-upload"></i>
              </label>
              <img
                src={details.img}
                alt={details.name}
                style={{ width: "50px", borderRadius: "50%" }}
              ></img>
            </div>

            <div id="image-caption" className={classes.testName}>
              <input
                onChange={(e) => onChangeHandler(e, details, index)}
                className={classes.editable}
                id="name"
                placeholder="name"
                value={details.name}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const onSaveHandler = () => {
    setloading(true);
    let data = {
      header: localData.header,
      data: card,
    };

    ctx.updateData(data, props.id);
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
                color: "white",
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

      {/* <div>
              <h2 className={classes.introHeader}>Copyrights@layatex.com</h2>
            </div> */}
      <div className={classes.root}>
    
        {ctx.isEditable ? (
          editable
        ) : (
          <>
          <h2 className={classes.introHeader}>{localData.header}</h2>
          <div className={classes.container}>
            <OwlCarousel className="owl-theme" {...options}>
              {card.map((item, index) => (
                <div key={index}>
                  <p className={classes.para}>{item.para} </p>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      margin: "10px",
                    }}
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      style={{ width: "50px", borderRadius: "50%" }}
                    ></img>
                  </div>
                  <div id="image-caption" className={classes.testName}>
                    {item.name}
                  </div>
                </div>
              ))}
            </OwlCarousel>
          </div>
          </>
        )}
      </div>

    </>
  );
};
