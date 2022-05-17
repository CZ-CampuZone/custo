import React, { useContext, useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import BannerImage1 from "../../../Assests/images/banner1.jpg";
import BannerImage2 from "../../../Assests/images/banner2.jpg";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import AuthContext from "../../../Context/Context";
import Loader from "../../../loader/Loader";
import { Update } from "../../../loader/Update";

import clsx from "clsx";
import { ReactComponent as DeleteIcon } from "../../../Assests/delete.svg";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      backgroundColor: "#efefef",
      position: "relative",
    },
    addCard: {
      borderRadius: "1rem",
      position: "absolute",
      background: "#fff",
      padding: "1rem 2rem",
      cursor: "pointer",
      top: "1rem",
      color:"#9e3a8ccc",
      right: "1rem",
      boxShadow: "2px 2px 3px 0 #ccc",
    },
    container: {
      width: "100%",
      position: "relative",
      padding: "1rem",
    },
    carouselContainer: {
      maxHeight: "600px",
      overflow: "hidden",
      padding: "0",
    },
    bannerImg: {
      position: "relative",
      width: "100%",
      height: "600px",
      backgroundSize: "cover",
      "& img": {
        width: "100%",
        height: "auto",
        objectFit: "contain",
      },
    },
    introHeader: {
      position: "absolute",
      color: "red",
      background: "transparent",
      outline: 0,
      border: "none",
      // fontSize: "1.5rem !important",
      paddingBottom: "1.5rem !important",
      textTransform: "capitalize",
      color: "#f64242",
      width: "60%",
      height: "fit-content",
      margin: "auto !important",
      left: 0,
      right: 0,
      top: "30%",
      fontSize: "40px",
      textAlign: "center",
    },
    introText: {
      position: "absolute",
      color: "#000",
      background: "transparent",
      outline: 0,
      border: "none",
      fontSize: "1rem !important",
      textTransform: "lowercase",
      letterSpacing: "0.25rem",
      textAlign: "justify",
      width: "60%",
      margin: "auto !important",
      left: 0,
      right: 0,
      top: "42%",
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
      introText: {
        fontSize: "12px !important",
      },
      introHeader: {
        fontSize: "20px !important",
      },
      carouselContainer: {
        maxHeight: "250px",
      },
      bannerImg: {
        height: "250px",
      },
    },
  })
);

export const BHero1 = (props) => {
  console.log(props.id);
  const [loading, setloading] = useState(false);
  const ctx = useContext(AuthContext);
  const [updatestatus, setUpdatestatus] = useState(false);
  const data = [
    {
      img: BannerImage1,
      header: "Intro header 1",
      para: "loerum ipsum is a dummy language for website content writing",
      id: "0",
    },
    {
      img: BannerImage2,
      header: "Intro header 2",
      para: "loerum ipsum is a dummy language for website content writing and adiitonal purposes",
      id: "1",
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
  const options = {
    loop: true,
    margin: 0,
    dots: false,
    nav: false,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplaySpeed: 3000,
    autoplayHoverPause: false,
    items: 1,
    touchDrag: false,
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
    const uploadPath = `images/${localData[i].header + localData[i].id}`; // upload path
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
      img: BannerImage1,
      header: "",
      para: "",
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
  const classes = useStyles();
  let editable = (
    <>
      {updatestatus === true && <Update />}
      {localData?.map((details, index) => (
        <div
          key={index}
          className={classes.bannerImg}
          style={{
            backgroundImage: `url(${details.img})`,
            marginBottom: "1rem",
            width: "auto",
          }}
        >
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
            type="file"
            onChange={(e) => onImageChange(e, index)}
            className={classes.inputFile}
            id={details.id}
            name={details.header}
          />
          <label className={classes.inputLabel} htmlFor={details.id}>
            <i className="fa fa-upload"></i>
          </label>

          <input
            onChange={(e) => onChangeHandler(e, details, index)}
            className={classes.introHeader}
            id="header"
            placeholder="Header"
            value={details.header}
            style={{ width: "75%" }}
          />
          <textarea
            onChange={(e) => onChangeHandler(e, details, index)}
            className={classes.introText}
            id="para"
            placeholder="text"
            value={details.para}
            style={{ width: "75%" }}
          />
        </div>
      ))}
      <div className={classes.addCard} onClick={addCard}>
      <i class="fa fa-plus-circle mx-2" aria-hidden="true"></i> Add Card
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
            <div className="row py-3 justify-content-end">
           <button
              className="btn px-5"
              onClick={onSaveHandler}
              style={{
                background: "#9e3a8ccc",
                fontSize:"20px",
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
      <div className={classes.root}>
        <div
          className={clsx(
            classes.container,
            ctx.isEditable ? "" : classes.carouselContainer
          )}
        >
          {ctx.isEditable ? (
            editable
          ) : (
            <OwlCarousel className="owl-theme" {...options} aut>
              {localData.map((item, index) => (
                <div
                  key={index}
                  className={classes.bannerImg}
                  style={{ backgroundImage: `url(${item.img})` }}
                >
                  {/* <img src={item.img} alt="bannerImage" /> */}
                  <Typography variant="h2" className={classes.introHeader}>
                    {item.header}
                  </Typography>
                  <Typography className={classes.introText}>
                    {item.para}
                  </Typography>
                </div>
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    </>
  );
};
