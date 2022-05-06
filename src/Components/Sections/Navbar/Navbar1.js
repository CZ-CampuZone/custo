import React from "react";
import styles from "./Navbar1.module.css";
const Navbar1 = () => {
  const data = {
    container: {
      style: "navbar navbar-expand-md shadow  navbar-light bg-lignt",
      value: "",
    },
    headerlogo: {
      style: "headerlogo",
      value: "/Images/mob.png",
    },
    menu1: {
      style: `nav-link ${styles.navlink}`,
      value: "Home",
    },
    menu2: {
      style: `nav-link ${styles.navlink}`,
      value: "About",
    },
    menu3: {
      style: `nav-link ${styles.navlink}`,
      value: "Gallery",
    },
    menu4: {
      style: `nav-link ${styles.navlink}`,
      value: "curriculam",
    },
    menu5: {
      style: `nav-link ${styles.navlink}`,
      value: "Contact us",
    },
  };

  return (
    <>
      <nav className={data.container.style}>
        {/* <!-- Brand --> */}
        <div className={`${styles.headerlogo}`}>
          <img
            className={`img-fluid ${styles.img_logo}`}
            src={data.headerlogo.value}
          />
        </div>

        {/* <!-- Toggler/collapsibe Button --> */}
        <button
          className={`navbar-toggler ${styles.navbartog}`}
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* <!-- Navbar links --> */}
        <div
          className={`navbar-collapse ${styles.navbarcollapse}`}
          id="collapsibleNavbar"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className={data.menu1.style} href="#Home">
                {data.menu1.value}
              </a>
            </li>
            <li className="nav-item">
              <a className={data.menu2.style} href="#About">
                {data.menu2.value}
              </a>
            </li>
            <li className="nav-item">
              <a className={data.menu3.style} href="#Gallery">
                {data.menu3.value}
              </a>
            </li>
            <li className="nav-item">
              <a className={data.menu4.style} href="#curriculam">
                {data.menu4.value}
              </a>
            </li>
            <li className="nav-item">
              <a className={data.menu5.style} href="#contact">
                {data.menu5.value}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar1;
