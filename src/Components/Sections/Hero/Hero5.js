import React from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import BannerImage1 from "../../../Assests/images/banner1.jpg";
import BannerImage2 from "../../../Assests/images/banner2.jpg";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      backgroundColor: "#efefef",
    },
    container: {
      width: "100%",
      position: "relative",
      maxHeight: "600px",
      overflow: "hidden",
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
      textAlign: "center",
    },
    introText: {
      position: "absolute",
      color: "#000",
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
  })
);

export const Hero5 = () => {
  const data = [
    {
      img: BannerImage1,
      header: "Intro header 1",
      para: "loerum ipsum is a dummy language for website content writing",
    },
    {
      img: BannerImage2,
      header: "Intro header 2",
      para: "loerum ipsum is a dummy language for website content writing and adiitonal purposes",
    },
  ];
  const options = {
    loop: true,
    margin: 0,
    dots: true,
    nav: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplaySpeed: 3000,
    autoplayHoverPause: false,
    items: 1,
  };
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <div className={classes.container}>
          <OwlCarousel className="owl-theme" {...options} aut>
            {data.map((item) => (
              <div
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
        </div>
      </div>
    </>
  );
};
