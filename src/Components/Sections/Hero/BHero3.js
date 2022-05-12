import React, { useContext, useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import OwlCarousel from "react-owl-carousel";
import { Update } from "../../../loader/Update";
import "owl.carousel/dist/assets/owl.carousel.css";
import AuthContext from "../../../Context/Context";
import Loader from "../../../loader/Loader";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import clsx from "clsx";
import { ReactComponent as DeleteIcon } from "../../../Assests/delete.svg";
import Background from "../../../Assests/Supermarket/bg.jpg";
import Slider1 from "../../../Assests/Supermarket/slider1.jpg";
import Slider2 from "../../../Assests/Supermarket/slider2.jpg";
import Offer from "../../../Assests/Supermarket/p1.jpg";

const useStyles = makeStyles(() =>
  createStyles({
    banner: {
      background: "url(" + Background + ")",
      backgroundSize: "cover",
    },
    slider: {
      // "& .button.owl-next": {
      //   position: "absolute",
      //   background:"red"
      // },
    },
    item: {
      backgroundSize: "cover",
      height: "400px",
    },
    offers: {
      backgroundSize: "cover",
      height: "400px",
    },
    editableHead: {
      outline: "0",
      width: "100%",
      fontSize: "40px",
      background: "transparent",
      border: "none",
    },
    addCard: {
      borderRadius: "1rem",
      position: "absolute",
      background: "#fff",
      padding: "1rem 2rem",
      top: "1rem",
      color: "#9e3a8ccc",
      cursor: "pointer",
      right: "1rem",
      boxShadow: "2px 2px 3px 0 #ccc",
    },
    editablePara: {
      outline: "0",
      width: "50%",
      background: "transparent",
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
  })
);

export const BHero3 = (props) => {
  const classes = useStyles();
  const options = {
    loop: true,
    margin: 0,
    dots: false,
    nav: true,
    autoplay: false,
    items: 1,
  };
  const [loading, setloading] = useState(false);

  const ctx = useContext(AuthContext);
  const cardData = {
    header: "20% Sales Off",
    para: "Synthetic seeds ",
    img: Offer,
    id:1,
    data: [
      {
        img: Slider1,
        title: "Active summer with Juice Milk 300ml",
        para: "Buy Now to Get Offers",
        id: "0",
      },
      {
        img: Slider2,
        title: "Farmart Food TakeAway",
        para: "Buy Now to Get Offers",
        id: "1",
      },
    ],
  };
  const [localData, setLocalData] = useState(
    ctx.websiteData[props.id] === undefined
      ? cardData
      : ctx.websiteData[props.id]
  );
  const [updatestatus, setUpdatestatus] = useState(false);
  const [card, setCard] = useState(localData.data);
  const onChange = (event) => {
    let val = event.target.value;
    setLocalData((prevState) => {
      return {
        ...prevState,
        [event.target.name]: val,
      };
    });
  };
  const onImageChange = (e, i) => {
    // setError(null);
    let selected = e.target.files[0];
    if (card[i].title === "") {
      alert("Image name cannot be Empty")
    }
    else {
      const storage = getStorage();
      const uploadPath = `images/${card[i].title + i}`;
      // upload path
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
    }
  }
  const onSideImageChange = (e) => {
    // setError(null);
    let selected = e.target.files[0];
    if (localData.header === "") {
      alert("Image header cannot be Empty")
    }
    else {
      const storage = getStorage();
      const uploadPath = `images/${localData.header }`;
      // upload path
      const storageRef = ref(storage, uploadPath); // create refernce to store data
      uploadBytes(storageRef, selected).then((snapshot) => {
        // console.log(snapshot);
        getDownloadURL(storageRef).then((url) => {
          setLocalData((prevState) => {
            let updatedData = null;
            updatedData = {
              ...prevState,
              img: url,
            };
            prevState = updatedData;
            return {...prevState};
          });
        });
      });
    }
  }
  const onChangeHandler = (e, details, index) => {
    const tempEventInputs = JSON.parse(JSON.stringify(details));
    if (e.target) {
      tempEventInputs[e.target.name] = e.target.value;
    }
    setCard((prevState) => {
      prevState[index] = tempEventInputs;
      return [...prevState];
    });
  };
  const addCard = () => {
    let updatedData = {
      img: Slider1,
      title: "",
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
    <>
      {updatestatus === true && <Update />}
      <div
        className={clsx(classes.banner, "row m-0 position-relative justify-content-between p-5")}
      >
        <div className={clsx(classes.slider, "col-md-9 p-2 position-relative")}>
          <OwlCarousel
            className={clsx(classes.slider, "owl-theme")}
            {...options}
          >
            {card.map((details, index) => (
              <div
                key={index}
                className={clsx(classes.item, "position-relative")}
                style={{ backgroundImage: "url(" + details.img + ")" }}
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
                  type="text"
                  name="title"
                  className={classes.editableHead}
                  value={details.title}
                  placeholder="title"
                  onChange={onChangeHandler}
                />
                <br />
                <input
                  type="text"
                  name="para"
                  placeholder="para"
                  className={classes.editablePara}
                  value={details.para}
                  onChange={onChangeHandler}
                />
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
            
              
              </div>
            ))}
          </OwlCarousel>
        </div>
        <div className={clsx(classes.slider, "col-md-3 p-2 position-relative")}>
          <div
            className={classes.offers}
            style={{ background: "url(" + localData.img + ")" }}
          >
            <input
              type="text"
              name="title"
              className={classes.editableHead}
              value={localData.header}
              onChange={onChange}
            />
            <br />
            <input
              type="text"
              name="para"
              className={classes.editablePara}
              value={localData.para}
              onChange={onChange}
            />
               <input
                type="file"
                onChange={(e) => onSideImageChange(e)}
                className={classes.inputFile}
                id={localData.id}
                name={localData.header}
              />
              <label className={classes.inputLabel} htmlFor={localData.id}>
                <i className="fa fa-upload"></i>
              </label>
          </div>
        </div>
        <div className={classes.addCard} onClick={addCard}>
        <i class="fa fa-plus-circle mx-2" aria-hidden="true"></i> Add Card
      </div>
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
      setUpdatestatus(true);
    }, 2000).then(
      setTimeout(() => {
        setUpdatestatus(false);
      }, 4000)
    );
  };

  return ctx.isEditable ? (
    <>
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
      {loading && (
        <>
          <Loader />
        </>
      )}
      {editable}
    </>
  ) : (
    <div
      className={clsx(classes.banner, "row m-0 justify-content-between p-3")}
    >
      <div className={clsx(classes.slider, "col-md-9 p-2 position-relative")}>
        <OwlCarousel className={clsx(classes.slider, "owl-theme")} {...options}>
          {card.map((item, index) => (
            <div
              key={index}
              className={clsx(classes.item, "position-relative")}
              style={{ background: "url(" + item.img + ")" }}
            >
              <Typography variant="h3" className="w-50 pl-4 pt-5">
                {item.title}
              </Typography>
              <Typography variant="h6" className="w-50 pl-4 pt-5">
                {item.para}
              </Typography>
            </div>
          ))}
        </OwlCarousel>
      </div>
      <div className={clsx(classes.slider, "col-md-3 p-2 position-relative")}>
        <div
          className={classes.offers}
          style={{ backgroundImage: "url(" + localData.img + ")" }}
        >
          <Typography variant="h4" className="w-50 pl-3 pt-5">
            {localData.header}
          </Typography>
          <Typography variant="body2" className="w-50 pl-3 pt-2">
            {localData.para}
          </Typography>
        </div>
      </div>
    </div>
  );
};
