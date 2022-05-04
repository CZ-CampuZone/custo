import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
// import { ReactComponent as Logo } from "../../Assests/logo.svg";
import { ReactComponent as StyleIcon } from "../../Assests/style.svg";
import { ReactComponent as LayoutIcon } from "../../Assests/layout.svg";

import Logo from "../../Assests/fickle.png";
import LandingImage from "../../Assests/Landing.png";
import AuthContext from "../../Context/Context";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
const Landing = (props) => {
  const ctx = useContext(AuthContext);
  useEffect(() => {
    ctx.updateIsEditable(false);
  }, []);
  

  return (
    <div className=" container ">
      <div className="container-fluid p-0">
        <h1 className="text-center mb-1" style={{ color: "var(--primary)" }}>
          {/* <Logo className="landing_logo" /> */}
          Manage your site.
        </h1>
        <h2 className="text-center mb-3"></h2>
        <p>
        In an ever-changing world, Fickle makes it easy for the user to remain competitive and successful by updating their desired content in their web site with few clicks. Let's Fickle in style.
        </p>
      </div>
   
     
     
     
      <div className="row m-0 mt-4">

        <div className="col-md-5 ">
          
        <div class="card-intro-box p-2 mb-4 py-3">
            <Link
              to={`/${ctx.userId}/styleguide`}
              className="intro-box Land-boxtext font-weight-bold row align-items-center "
            >
              
              <StyleIcon className="icon" />
              View Style Guide
              <span className="ml-2">→</span>
            </Link>
          </div>

          <div class="card-intro-box  p-2 mt-4 py-3">
            <Link
              to={`/${ctx.userId}/layout`}
              className="intro-box Land-boxtext font-weight-bold row align-items-center "
            >
              
              <LayoutIcon className="icon" />
              Build Pages
              <span className="ml-2">→</span>
            </Link>
          </div>
          {/* <Link
            to={`/${ctx.userId}/styleguide`}
            className="intro-box row align-items-center mb-3"
          >
            <StyleIcon className="icon" />
            View Style Guide
            <span className="ml-2">→</span>
          </Link> */}
          {/* <Link
            to={`/${ctx.userId}/layout`}
            className="intro-box row align-items-center"
          >
            <LayoutIcon className="icon" />
            Build Pages
            <span className="ml-2 ">→</span>
          </Link> */}
        </div>
        <div className="col-md-7 m-0 ">

          <img className="img-fluid" src="/Images/landing.jpg" alt="landing" />

        </div>
      </div>
    </div>
  );
};

export default Landing;
