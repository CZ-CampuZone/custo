import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../Assests/logo.svg";
import { ReactComponent as StyleIcon } from "../../Assests/style.svg";
import { ReactComponent as LayoutIcon } from "../../Assests/layout.svg";
import AuthContext from "../../Context/Context";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
const Landing = (props) => {
  const ctx = useContext(AuthContext);
  useEffect(() => {
    ctx.updateIsEditable(false);
  }, []);
  const checkdata = {
    h2: "tamil",
  };

  return (
    <div className="p-2">
      <div className="container-fluid p-0">
        <h1 className="text-center mb-1" style={{ color: "var(--primary)" }}>
          <Logo className="landing_logo" />
          Manage your site.
        </h1>
        <h2 className="text-center mb-3"></h2>
        <p>
          In a visual world, Canva Pro makes it easy for teams to achieve their
          collective goals and create professional designs together, with
          premium features like Brand Kit, Background Remover, and more.
        </p>
      </div>

      <div className="row mt-4">
      
        <div className="col-md-5 p-1 pr-2">
          <Link
            to={`/${ctx.userId}/styleguide`}
            className="intro-box row align-items-center mb-3"
          >
            <StyleIcon className="icon" />
            View Style Guide
            <span className="ml-2">→</span>
          </Link>
          <Link
            to={`/${ctx.userId}/layout`}
            className="intro-box row align-items-center"
          >
            <LayoutIcon className="icon" />
            Build Pages
            <span className="ml-2 ">→</span>
          </Link>
        </div>
        <div className="col-md-7 p-1">
          
          <img className="img-fluid" src="/Images/landing.jpg" alt="landing" />
          
        </div>
      </div>
    </div>
  );
};

export default Landing;
