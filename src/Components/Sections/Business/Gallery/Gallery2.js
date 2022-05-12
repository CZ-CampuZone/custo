import React, { useContext, useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import AuthContext from "../../../../Context/Context";
import Loader from "../../../../loader/Loader";
import Product1 from "../../../Assests/Supermarket/product1.jpg";
import { ReactComponent as DeleteIcon } from "../../../Assests/delete.svg";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Update } from "../../../../loader/Update";
import clsx from "clsx";

const useStyles = makeStyles(() =>
  createStyles({
    introHeader: {
      fontSize: "1.75rem !important",
      color: "#000",
    
      background: "transparent",
      outline: 0,
      border: "none",
      width:"17%"
    },
    editableTitle:{
      color: "#9797a5",
      fontSize:"10px", 
      background: "transparent",
      outline: 0,
      border: "none",
    },
    editablePara:{
     
      background: "transparent",
      outline: 0,
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
    },
  })
);
export const Gallery2 = (props) => {
  const classes = useStyles();
  const [loading, setloading] = useState(false);
  const ctx = useContext(AuthContext);
  const cardData = {
    header: "Featured Brands",
    data: [
      {
        img: Product1,
        title: "Foodpouch",
        para: "Buy Now to Get Offers",
        id: "0",
      },
      {
        img: Product1,
        title: "Foodpouch",
        para: "Buy Now to Get Offers",
        id: "1",
      },
      {
        img: Product1,
        title: "Foodpouch",
        para: "Buy Now to Get Offers",
        id: "2",
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
  const options = {
    loop: true,
    margin: 30,
    dots: false,

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
    const tempEventInputs = JSON.parse(JSON.stringify(details));
    if (e.target) {
      tempEventInputs[e.target.id] = e.target.value;
    }
    setCard((prevState) => {
      prevState[index] = tempEventInputs;
      return [...prevState];
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
  const addCard = () => {
    let updatedData = {
      img: Product1,
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
      <div className=" position-relative mt-4 py-2">
        
        <input
          className={clsx(classes.introHeader, "d-inline mb-2 mr-4")}
          placeholder="Header"
          id="header"
          onChange={onChange}
          value={localData.header}
        />
        <span style={{ color: "#9797a5" }} className="d-inline">
          All Offers {">"}{" "}
        </span>

        <div className="row mt-2 ">
          {card.map((details, index) => (
            <div key={index} className="m-0 col-md-3 position-relative">
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
              <div className="p-0 rounded">
                <img
                  className="img-thumbnail p-0 border-0"
                  src={details.img}
                  alt=""
                />
              </div>
              <input
                onChange={(e) => onChangeHandler(e, details, index)}
                className={classes.editableTitle}
                id="title"
                style={{ fontSize: "15px" }}
                value={details.title}
                placeholder="Dress Name"
              />

              <input
                onChange={(e) => onChangeHandler(e, details, index)}
                className={classes.editablePara}
                id="para"
               
                value={details.para}
                placeholder="para"
              />
            </div>
          ))}
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

      {ctx.isEditable ? (
        editable
      ) : (
        <>
          <div className=" mt-4 py-2">
            <h4 className="d-inline mb-2 mr-4">{localData.header}</h4>{" "}
            <span style={{ color: "#9797a5" }} className="d-inline">
              All Offers {">"}
            </span>
            <OwlCarousel className="owl-theme mt-2 " {...options}>
              {card.map((item, index) => (
                <div key={index} className="m-0">
                  <div className="p-0 rounded">
                    <img
                      className="img-thumbnail p-0 border-0"
                      src={item.img}
                      alt=""
                    />
                  </div>

                  <h6 style={{ color: "#9797a5" }}>{item.title}</h6>
                  <h5>{item.para}</h5>
                </div>
              ))}
            </OwlCarousel>
          </div>
        </>
      )}
    </>
  );
};
