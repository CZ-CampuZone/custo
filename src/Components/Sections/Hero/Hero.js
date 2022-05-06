import React, { useContext, useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import AuthContext from "../../../Context/Context";
import Loader from "../../../loader/Loader";
import clsx from "clsx";
import Background from "../Assets/Images/bg.jpg";
import Slider1 from "../Assets/Images/slider1.jpg";
import Slider2 from "../Assets/Images/slider2.jpg";
import Offer from "../Assets/Images/p1.jpg";

const useStyles = makeStyles(() =>
  createStyles({
    banner: {
      background: "url(" + Background + ")",
      backgroundSize: "cover",
    },
    slider: {},
    item: {
      backgroundSize: "cover",
      height: "400px",
    },
    offer: {
      backgroundSize: "cover",
      height: "400px",
    },
  })
);

export const Hero = (props) => {
  const options = {
    loop: false,
    margin: 0,
    dots: false,
    autoplay: false,
    items: 1,
  };
  const [loading, setloading] = useState(false);
  const ctx = useContext(AuthContext);
  const cardData = {
    header: "20% Sales Off",
    para: "Synthetic seeds ",
    img: Offer,
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
  let editable = (
    <>
      {updatestatus === true && <Update />}
      <div
        className={clsx(classes.banner, "row m-0 justify-content-between p-3")}
      >
        <div className={clsx(classes.slider, "col-md-9 p-2 position-relative")}>
          <OwlCarousel className="owl-theme" {...options}>
            {card.map((item, index) => (
              <div
                key={index}
                className={clsx(classes.item, "position-relative")}
                style={{ background: "url(" + item.img + ")" }}
              >
                <input
                  type="text"
                  name="title"
                  value={item.title}
                  onChange={onChangeHandler}
                />
                <input
                  type="text"
                  name="para"
                  value={item.para}
                  onChange={onChangeHandler}
                />
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
                  value={localData.header}
                  onChange={onChange}
                />
                <input
                  type="text"
                  name="para"
                  value={localData.para}
                  onChange={onChange}
                />
          </div>
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
  const classes = useStyles();
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
        <OwlCarousel className="owl-theme" {...options}>
          {card.map((item, index) => (
            <div
              key={index}
              className={clsx(classes.item, "position-relative")}
              style={{ background: "url(" + item.img + ")" }}
            >
              <Typography variant="h6" className="w-50 pl-4 pt-3">
                {item.title}
              </Typography>
              <Typography variant="body2" className="w-50 pl-4 pt-3">
                {item.para}
              </Typography>
            </div>
          ))}
        </OwlCarousel>
      </div>
      <div className={clsx(classes.slider, "col-md-3 p-2 position-relative")}>
        <div
          className={classes.offers}
          style={{ background: "url(" + localData.img + ")" }}
        >
          <Typography variant="h6" className="w-50 pl-3 pt-3">
            {localData.title}
          </Typography>
          <Typography variant="body2" className="w-50 pl-3 pt-3">
            {localData.para}
          </Typography>
        </div>
      </div>
    </div>
  );
};
