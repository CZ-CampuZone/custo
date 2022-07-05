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
            padding: "1rem",
            display: "flex",
            flexWrap: "wrap",
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

export const Hero3 = () => {
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
    const classes = useStyles();
    return (
        <>
            <div className={classes.root}>
              
                    {localData.map((item, index) => (
                          <div class="d-sm-flex align-items-center justify-content-between w-100" style={{ height: "100vh" }}>
                            <div class="col-md-4 mx-auto mb-4 mb-sm-0 headline">
                                <span class="text-secondary text-uppercase">Subheadline</span>
                                <h1 class="display-4 my-4 font-weight-bold">Enter Your <span style={{ color: "#9B5DE5;" }}>Headline Here</span></h1>
                                <a href="#" class="btn px-5 py-3 text-white mt-3 mt-sm-0" style={{ borderRadius: "30px", backgroundColor: "#9B5DE5" }}>Get Started</a>
                            </div>

                            <div class="col-md-8 h-100 clipped" style={{ minHeight: "350px", backgroundImage: "url(https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80)", backgroundPosition: "center", backgroundSize: "cover" }}>
                            </div>
                       </div>
                    ))}
                

            </div>
        </>
    );
};
