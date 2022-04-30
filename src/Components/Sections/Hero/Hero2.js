import React, { useContext, useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import BannerImage1 from "../../../Assests/images/banner1.jpg";
import BannerImage2 from "../../../Assests/images/banner2.jpg";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import AuthContext from "../../../Context/Context";
import Loader from "../../../loader/Loader";
import clsx from "clsx";
import { ReactComponent as DeleteIcon } from "../../../Assests/delete.svg";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
const Hero2 = () => {
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
            <div class="d-sm-flex align-items-center justify-content-between w-100" style={{height: "100vh"}}>
                <div class="col-md-4 mx-auto mb-4 mb-sm-0 headline">
                    <span class="text-secondary text-uppercase">Subheadline</span>
                    <h1 class="display-4 my-4 font-weight-bold">Enter Your <span style={{color: "#9B5DE5;"}}>Headline Here</span></h1>
                    <a href="#" class="btn px-5 py-3 text-white mt-3 mt-sm-0" style={{borderRadius: "30px", backgroundColor: "#9B5DE5"}}>Get Started</a>
                </div>

                <div class="col-md-8 h-100 clipped" style={{minHeight: "350px", backgroundImage: "url(https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80)", backgroundPosition: "center", backgroundSize: "cover"}}>

                </div>
            </div>
        </>
    );
}
