import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as DashboardIcon } from "../../Assests/dashboard.svg";
import { ReactComponent as StyleIcon } from "../../Assests/style.svg";
import { ReactComponent as SectionIcon } from "../../Assests/sections.svg";
import { ReactComponent as LayoutIcon } from "../../Assests/layout.svg";
import { ReactComponent as EditIcon } from "../../Assests/edit.svg";
import { ReactComponent as GalleryIcon } from "../../Assests/gallery.svg";
import { ReactComponent as SettingsIcon } from "../../Assests/settings.svg";
import AuthContext from "../../Context/Context";
import Logo from "../../Assests/fickle2.png";
const Sidebar = () => {
  const ctx = useContext(AuthContext);
  const navMenuList = [
    {
      name: "Home",
      path: "home",
      icon: DashboardIcon,
    },
    {
      name: "Style Guide",
      path: "styleguide",
      icon: StyleIcon,
    },
    {
      name: "Sections",
      path: "sections",
      icon: SectionIcon,
    },
    {
      name: "Layout",
      path: "layout",
      icon: LayoutIcon,
    },
    {
      name: "Edit",
      path: "edit",
      icon: EditIcon,
    },
    // {
    //   name: "Gallery",
    //   path: "gallery",
    //   icon: GalleryIcon,
    // },
    {
      name: "Messages",
      path: "messages",
      icon: SettingsIcon,
    },
  ];
  return (
    <>
      <div
        className="col-md-3 col-lg-2 left_col p-0 position-fixed"
        style={{ top: 0, left: 0 }}
      >
        <div className="scroll-view border-right">
          <div
            className="nav_title position-relative  text-center  p-0 "
            style={{ height: "9vh", overflow: "hidden" }}
          >
            <img src={Logo} className="landing_logo" />
          </div>
          <div className="text-center m-0">
            <h5 class=" p-3 rounded headtext m-0 font-weight-bold m-1">
              {ctx.user.websitename}{" "}
            </h5>
          </div>
          <ul className="nav side-menu  pt-2 px-2">
            {navMenuList.map((menuItem) => {
              return (
                <li className="list-item d-block w-100" key={menuItem.name}>
                  <NavLink to={menuItem.path}>
                    {menuItem.icon && <menuItem.icon />}
                    <div className="set">{menuItem.name}</div>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
