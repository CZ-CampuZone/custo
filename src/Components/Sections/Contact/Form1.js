import React, { useContext, useState } from "react";
import AuthContext from "../../../Context/Context";
import styles from "./Form1.css";
import Loader from "../../../loader/Loader";
import clsx from "clsx";


const Form1 = (props) => {
  const [loading, setloading] = useState(false);
  const ctx = useContext(AuthContext);
  const data = {
    header: "Contact Us",
    para: " Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmodtempor incidunt ut labore et dolore magna aliqua. Ut enim ad minimeniam, quis nostrum",
    address: "xxx, yyy, zzz - 123123",
    phone: "99887 766554",
    email: "sample@gmail.com",
  };
  const [localData, setLocalData] = useState(
    ctx.websiteData[props.id] === undefined ? data : ctx.websiteData[props.id]
  );
  const onChangeHandler = (event) => {
    let val = event.target.value;
    setLocalData((prevState) => {
      return {
        ...prevState,
        [event.target.id]: val,
      };
    });
  };
  return (
    <>
      {ctx.isEditable ? (
        <div className="row py-3 justify-content-end">
          <div
            className="saveButton"
            onClick={() => {
              setloading(true);
              ctx.updateData(localData);
              setTimeout(() => {
                setloading(false);
              }, 2000);
            }}
          >
            Save
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
    <section class="about-section">
        <div class="container">
            <div class="row">                
                <div class="content-column col-lg-6 col-md-12 col-sm-12 order-2">
                    <div class="inner-column">
                        <div class="sec-title">
                            <span class="title">Contact us</span>
                            <h2>We are leader in <br/>Industrial market Since 1992</h2>
                        </div>
                        <div class="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur.</div>
                        <ul class="list-style-one">
                            <li>Lorem Ipsum is simply dummy tex</li>
                            <li>Consectetur adipisicing elit</li>
                            <li>Sed do eiusmod tempor incididunt</li>
                        </ul>
                        <div class="btn-box">
                            <a href="#" class="theme-btn btn-style-one">Contact Us</a>
                        </div>
                    </div>
                </div>

         
                <div class="image-column col-lg-6 col-md-12 col-sm-12">
                    <div class="inner-column wow fadeInLeft">
                        <figure class="image-1"><a href="#" class="lightbox-image" data-fancybox="images"><img src="https://i.ibb.co/QP6Nmpf/image-1-about.jpg" alt=""/></a></figure>
                        <figure class="image-2"><a href="#" class="lightbox-image" data-fancybox="images"><img src="https://i.ibb.co/JvN0NVB/image-2-about.jpg" alt=""/></a></figure>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  );
};

export default Form1;
