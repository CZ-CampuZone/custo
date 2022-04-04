import React, { useContext, useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import AuthContext from "../../../Context/Context";
import Loader from "../../../loader/Loader";
import Dress1 from "../../../Assests/images/dress1.jpg";
import Dress2 from "../../../Assests/images/dress2.jpg";
import Dress3 from "../../../Assests/images/dress3.jpg";
import { ReactComponent as DeleteIcon } from "../../../Assests/delete.svg";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: "relative",
      backgroundColor: "#efefef",
      padding: "1rem",
    },
    row: {
      display: "flex",
      flexWrap: "wrap",
      // justifyContent:"space-between"
    },
    card: {
      position: "relative",
      background: "#fff",
      padding: "1rem",
      marginBottom: "0.5rem",
      "& img": {
        maxWidth: "100%",
        height: "auto",
      },
    },
    introHeader: {
      fontSize: "1.75rem !important",
      color: "#000",
      textTransform: "capitalize",
      textAlign: "center",
      paddingBottom: "1.5rem",
      background: "transparent",
      outline: 0,
      border: "none",
      width: "100%",
    },
    footer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    imgText: {
      fontSize: "0.75rem",
      color: "#333",
      fontWeight: "200",
      padding: "0.75rem 0",
      textTransform: "capitalize",
      background: "transparent",
      outline: 0,
      border: "none",
    },
    rate: {
      background: "transparent",
      outline: 0,
      border: "none",
      fontSize: "0.85rem",
      color: "#000",
      fontWeight: "500",
    },
    addCard: {
      borderRadius: "1rem",
      position: "absolute",
      background: "#fff",
      padding: "1rem 2rem",
      top: "1rem",
      cursor: "pointer",
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
      top: "0",
      right: "0",
      zIndex: 20,
      textAlign: "center",
      cursor: "pointer",
      "& i": {
        fontSize: "1.75rem",
      },
      // "@media (max-width: 600px)": {
      //   card: {
      //     width: "100%",
      //   },
      // },
    },
  })
);

const Gallery2 = (props) => {
  const classes = useStyles();
  const [loading, setloading] = useState(false);
  const ctx = useContext(AuthContext);

  const options = {
    loop: true,
    margin: 30,
    dots: false,
    nav: false,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplaySpeed: 2000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
      450: {
        items: 2,
      },
      750: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  };

  const cardData = {
    header: "New Arrivals",
    data: [
      {
        img: Dress1,
        title: "Ratione voluptatem sequi...",
        rate: "199",
        id: "0",
      },
      {
        img: Dress2,
        title: "Ratione voluptatem sequi...",
        rate: "179",
        id: "1",
      },
      {
        img: Dress3,
        title: "Ratione voluptatem sequi...",
        rate: "189",
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
  const onChange = (event) => {
    let val = event.target.value;
    setLocalData((prevState) => {
      return {
        ...prevState,
        [event.target.id]: val,
      };
    });
  };
  const onChangeHandler = (e, details, index) => {
    setCard((prevState) => {
      let updatedData = null;
      if (e.target.id === "header") {
        updatedData = {
          header: e.target.value,
        };
      } else if (e.target.id === "title") {
        updatedData = {
          ...details,
          title: e.target.value,
        };
      } else {
        updatedData = {
          ...details,
          rate: e.target.value,
        };
      }
      prevState[index] = updatedData;
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
    const uploadPath = `images/${card[i].title}`; // upload path
    const storageRef = ref(storage, uploadPath); // create refernce to store data

    uploadBytes(storageRef, selected).then((snapshot) => {
      // console.log(snapshot);
      getDownloadURL(storageRef).then((url) => {
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
      img: Dress1,
      title: "",
      rate: "",
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
    <>
      <input
        className={classes.introHeader}
        placeholder="Header"
        id="header"
        onChange={onChange}
        value={localData.header}
      />
      <div className={classes.row}>
        {card.map((details, index) => (
          <div
            key={index}
            className={classes.card}
            style={{ width: "24%", marginRight: "1%" }}
          >
            <div
              onClick={() => removeCard(details.id)}
              style={{
                position: "absolute",
                background: "#fff",
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
              name={details.title}
            />
            <label className={classes.inputLabel} htmlFor={details.id}>
              <i className="fa fa-upload"></i>
            </label>
            <img src={details.img} alt={details.title} />
            <div className={classes.footer}>
              <input
                onChange={(e) => onChangeHandler(e, details, index)}
                className={classes.imgText}
                id="title"
                style={{ fontSize: "15px" }}
                value={details.title}
                placeholder="Dress Name"
              />

              <input
                onChange={(e) => onChangeHandler(e, details, index)}
                className={classes.rate}
                id="rate"
                style={{ fontSize: "15px", marginLeft: "10px" }}
                value={details.rate}
                placeholder="rate"
              />
            </div>
          </div>
        ))}
      </div>
      <div className={classes.addCard} onClick={addCard}>
        Add Card
      </div>
    </>
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
    }, 2000);
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
        {ctx.isEditable ? (
          editable
        ) : (
          <>
            <Typography className={classes.introHeader}>
              {localData.header}
            </Typography>
            <OwlCarousel className="owl-theme" {...options}>
              {card.map((item, index) => (
                <div className={classes.card} key={index}>
                  <img src={item.img} alt={item.title} />
                  <div className={classes.footer}>
                    <Typography variant="body2" className={classes.imgText}>
                      {item.title}
                    </Typography>
                    <Typography variant="caption" className={classes.rate}>
                      Rs. {item.rate}
                    </Typography>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          </>
        )}
      </div>
    </>
  );
};
 export default Gallery2;